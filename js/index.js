var app = angular.module('app1', [])



app.controller('storiesController', function($scope, $http) {

  $scope.showComments = function() {
    $scope.loadingcomments = 1
    $scope.comments = []
    if (this.m.descendants) {
      var top20 = this.m.kids.slice(0, 19)
      top20.map(function(comment) {
        $http.get('https://hacker-news.firebaseio.com/v0/item/' + comment + '.json?print=pretty').then(function(data) {
          $scope.comments.push(data.data)
          $scope.loadingcomments = 0
        })
      })
    }
  }
  $http.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then(function(data) {
    var storyIDs = data.data.slice(0, 20)
    $scope.allStories = data.data
    $scope.fetched = 20
    $scope.stories = []
    for (var i = 0; i < storyIDs.length; i++) {
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

  $scope.loadMore = function() {
    var storyIDs = $scope.allStories.slice($scope.fetched+1, $scope.fetched+20)
    $scope.fetched += 20
    storyIDs.map(function(story) {
      $http.get('https://hacker-news.firebaseio.com/v0/item/' + story + '.json?print=pretty').then(function(data) {
        $scope.stories.push(data.data)
      })

    })
  }

})

app.filter('unsafe', function($sce) {
  return $sce.trustAsHtml
})

app.filter('timeAgo', function($sce) {
  return function(x) {
    var posted = new Date(x)
    posted = posted.toUTCString()
    return posted
  }
})
