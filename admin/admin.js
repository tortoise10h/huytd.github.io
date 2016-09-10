let app = angular.module('adminApp', []);

app.controller('admin', function($scope, $http) {
  $scope.publishedPosts = [];
  $scope.unpublishedPosts = [];

  $scope.refresh = () => {
    $http.get('/published').success((data) => {
      $scope.publishedPosts = Array.from(data.published);
    });

    $http.get('/unpublished').success((data) => {
      $scope.unpublishedPosts = Array.from(data.unpublished);
    });
  }

  $scope.refresh();

  $scope.publishPost = (post, index) => {
    $scope.unpublishedPosts.splice(index, 1);
    $scope.publishedPosts.push(post);
    $scope.updateAll();
  }

  $scope.unpublishPost = (post, index) => {
    $scope.publishedPosts.splice(index, 1);
    $scope.unpublishedPosts.push(post);
    $scope.updateAll();
  }

  $scope.updateAll = () => {
    $http.post('/update', { data: $scope.publishedPosts })
      .success(function(data) {
      });
  }

  $scope.swap = (a, b) => {
    let temp = $scope.publishedPosts[a];
    $scope.publishedPosts[a] = $scope.publishedPosts[b];
    $scope.publishedPosts[b] = temp;
  }

  $scope.moveUp = (idx) => {
    $scope.swap(idx, idx-1);
    $scope.updateAll();
  }

  $scope.moveDown = (idx) => {
    $scope.swap(idx, idx+1);
    $scope.updateAll();
  }
});
