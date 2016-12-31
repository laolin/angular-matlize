'use strict';

angular.module('mz-js')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mz-js.home', {
    templateUrl: 'modules/mz-js/mz-js.home.template.html',
    controller: ['$scope','$http','$log','$interval',function mzjsHomeCtrl($scope,$http,$log,$interval) {
       $scope.text='afasf';

    }]
  });
}]);
