'use strict';
(function(){

angular.module('qgs-ui')
.component('qgsUiHeader',{
    templateUrl: 'modules/qgs-ui/qgs-ui.header.template.html',
    bindings: {
      headerData: '='
    },
    controller: ['$scope','$log','$timeout','$location','qgsMainAppData', function ($scope,$log,$timeout,$location,qgsMainAppData){
    
      $scope.$ctrl.searchWord='';
      $scope.$ctrl.searchPlaceholder='商户名称/地址/电话';
      $scope.$ctrl.searchList = []; //TODO: values will get from API
      
      $scope.$ctrl.clearSearchWord=function(){
        $scope.$ctrl.searchWord='';
      }

      $scope.$ctrl.startSearch=function(){
        qgsMainAppData.startSearch($scope.$ctrl.searchWord);
        $location.url('/mz-user.search');
      }
      
    }]
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  

})();