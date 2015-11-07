ngReddit.controller('NgRedditCtrl', function($scope, Reddit) {

  // Default to /r/funny
  $scope.category = "funny";

  // Function is called on page load (line 15) and every time the
  // search field is changed
  $scope.getPosts = function() {
    Reddit.getPosts($scope.category)
      .then(function(res) {
        $scope.posts = res.data.data.children;
        $scope.posts.map(function(post) {
          if (post.data.thumbnail === "" || post.data.thumbnail === "nsfw") {
            post.data.thumbnail = "images/unknown.png";
          }
        });
        console.log("Posts: ", $scope.posts);
      });
  };

  $scope.getPosts();

});