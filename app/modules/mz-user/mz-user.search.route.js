'use strict';

angular.module('mz-user')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mz-user.search', {
    templateUrl: 'modules/mz-user/mz-user.search.template.html',
    controller: ['$scope','$http','$log','$interval','qgsMainAppData',
        function mzUserSearchCtrl($scope,$http,$log,$interval,qgsMainAppData) {
      $scope.srData=qgsMainAppData.getSearchData();
      $scope.abc=389;

    }]
  });
}]);
