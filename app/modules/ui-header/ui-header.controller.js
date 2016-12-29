'use strict';
(function(){

angular.module('ui.header')
.controller('uiHeader',['$scope','$log', uiHeaderController ]);
function uiHeaderController($scope,$log){
  $scope.logoUri='assets/img/logo-32.png';
  $scope.citys = [
    '上海',
    '北京',
    '深圳',
    '乌鲁木齐'
  ];
  $scope.city='上海';
  $scope.searchWord='';
  $scope.searchList = []; //TODO: values will get from API
  $scope.clearSearchWord=function(){
    $scope.searchWord='';
  }
  
  //TODO: 
  $scope.startSearch=function(){
    $log.log('Under development. Search word is '+$scope.searchWord);
  }
  
  
  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };
}

})();