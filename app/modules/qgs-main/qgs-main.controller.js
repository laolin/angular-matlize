'use strict';
(function(){

angular.module('qgs-main')
.controller('qgsMainCtrl',['$scope','$log','qgsMainAppData', function ($scope,$log,qgsMainAppData){
  this.dataFn=qgsMainAppData;
  this.dataFn.startPathMonitor();
  $scope.appData=this.dataFn.getAppData();
}])//end of function qgsMainController

})();