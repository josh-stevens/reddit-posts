// Makes a GET request to Reddit for the appropriate JSON
ngReddit.factory('Reddit', function($http) {
  return {
    getPosts: function(category) {
      return $http.get('http://www.reddit.com/r/' + category + '/.json');
    }
  };
});