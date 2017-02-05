'use strict';

angular.module('mz-user')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mz-user.search', {
    templateUrl: 'modules/mz-user/mz-user.search.template.html',
    controller: ['$scope','$http','$log','$location','qgsMainAppData',
      function mzUserSearchCtrl($scope,$http,$log,$location,qgsMainAppData) {
        var userData=qgsMainAppData.getUserData();
        if(! userData || !userData.token) {
          return $location.path( "/wx-login" );
        }

      }
	]
  });
}]);
