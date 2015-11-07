ngReddit.controller('NgRedditCtrl', function($scope, Reddit) {

  // Default to /r/funny
  $scope.category = "funny";

  // Function is called on page load (line 15) and every time the
  // search field is changed
  $scope.getPosts = function() {
    Reddit.getPosts($scope.category)
      .then(function(res) {
        $scope.posts = res.data.data.children;

        // If the thumbnail property is anything other than a link,
        // set it to the 'unknown' image
        $scope.posts.map(function(post) {
          if (post.data.thumbnail.slice(0,4) !== "http") {
            post.data.thumbnail = "images/unknown.png";
          }
        });
      });
  };

  $scope.overlayPost = function(index) {
    var id = '#' + index;
    $scope.posts[index].clicked = true;
    $(id).draggable({revert:true});
  };

  $scope.getPosts();

});