'use strict';

angular.module('myApp.index', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'modules/index/index.root.template.html',
    controller: ['$scope','$location','$log','$interval','qgsMainAppData',
      function ($scope,$location,$log,$interval,qgsMainAppData) {
        var userData=qgsMainAppData.getUserData();
        var appData=qgsMainAppData.getAppData();
        $scope.userData=userData;
        $scope.appData=appData;
        
        if(! userData || !userData.token) {
          return $location.path( "/wx-login" ).search({pageTo: '/'});
        }

        $scope.logout=function() {
          //userData.token='';
          appData.userDataService.setUserData({});//Update to localStorage
          $location.path('/wx-login');
        }
      }
    ]
  })
  $routeProvider.when('/index', {
    templateUrl: 'modules/index/index.template.html',
    controller: ['$scope','$http','$log','$interval',function indexCtrl($scope,$http,$log,$interval) {
      //$http.jsonp('http://api.laolin.com/hello/ip?r='+Date.now()).then(function(response) {
      //    $log.log(response);
      //    $scope.ip = response.data.ip;
      //  });
      $scope.iChild=0;
      $scope.iColor=0;
      $scope.eLoading=document.getElementById('gData_loading');;
      $scope.colors=['#f90',
        'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'
        ];
      
      $scope.loading=function () {
        var e=$scope.eLoading;
        if(e.children.length==0)return;
        if($scope.iChild  >= e.children.length || $scope.iChild<0)$scope.iChild=0;
        if($scope.iColor  >= $scope.colors.length || $scope.iColor<0)$scope.iColor=0;
        e.children[$scope.iChild].setAttribute('style','color:'+$scope.colors[$scope.iColor]);
        $scope.iChild++;
        if($scope.iChild>=e.children.length) {
          $scope.iChild=0;
          $scope.iColor++;
        }
      }
      $interval($scope.loading,300);

    }]
  });
}]);
