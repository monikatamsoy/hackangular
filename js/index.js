var app = angular.module('app1', [])



app.controller('storiesController', function($scope, $http) {
  $http.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty').then(function(data) {
    var storyIDs = data.data.slice(0, 19)
    $scope.stories = []
    for (var i = 0; i < storyIDs.length; i++) {
      console.log(i)
      $http.get('https://hacker-news.firebaseio.com/v0/item/'+ storyIDs[i] +'.json?print=pretty').then(function(data) {
        $scope.stories.push(data.data)
      })
      if (i == 18) {
        setTimeout(function() {
          document.getElementById('spinner').remove()
        }, 0)
      }
    }


  })
})
