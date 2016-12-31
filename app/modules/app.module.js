'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [

    'myApp.index',
    'qgs-main',//qgsMainCtrl
    'qgs-ui',//component <qgs-ui-xxx>
    'mz-js',//满足满意-技师
    'mz-user',//满足满意-用户
    
    'ngRoute'
  ]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/mz-js.home'});
}]);
