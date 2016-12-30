'use strict';

angular.module('mz-js')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mz-js.my', {
    templateUrl: 'modules/mz-js/mz-js.my.template.html',
    controller: ['$scope','$http','$log','$interval',function mzjsMyCtrl($scope,$http,$log,$interval) {
       $scope.v1='GpGSG120';

    }]
  });
}]);
