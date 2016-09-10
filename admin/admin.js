let app = angular.module('adminApp', []);

app.controller('admin', function($scope, $http) {
  $scope.publishedPosts = [];
});
