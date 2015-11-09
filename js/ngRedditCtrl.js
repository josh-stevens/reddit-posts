ngReddit.controller('NgRedditCtrl', function($scope, Reddit) {

  // Default to /r/funny
  $scope.category = "funny";

  // Function is called on page load (line 48) and every time the
  // search field is changed
  $scope.getPosts = function() {
    $scope.loading = true;
    Reddit.getPosts($scope.category)
      .then(function(res) {
        $scope.loading = false;
        $scope.posts = res.data.data.children;
        console.log($scope.posts)

        // If the thumbnail property is anything other than a link,
        // set it to the 'unknown' image
        $scope.posts.map(function(post) {
          if (post.data.thumbnail.slice(0,4) !== "http") {
            post.data.thumbnail = "images/unknown.png";
          }
        });
      });
  };

  // Function sets up drag/drop elements and toggles the 'clicked' property
  // of the post which will trigger the overlay div's ng-show
  $scope.overlayPost = function(index) {
    var id = '#' + index;
    $(id).draggable({
      revert:true,
      opacity: 0.5
    });

    var link = "http://www.reddit.com" + $scope.posts[index].data.permalink;
    $('#reddit-'+index).droppable({
      drop: function() {
        window.open(link);
      }
    });

    $('#mail-'+index).droppable({
      drop: function() {
        var subj = "Check%20out%20this%20Reddit%20post";
        var body = link;
        location.href= "mailto:?subject="+subj+"&body="+body;
      }
    });

    $scope.posts[index].clicked = !$scope.posts[index].clicked;
  };

  $scope.getPosts();

});