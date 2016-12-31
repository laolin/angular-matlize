'use strict';
(function(){

angular.module('qgs-main')
.controller('qgsMainCtrl',['$scope','$log','qgsMainAppData', function ($scope,$log,qgsMainAppData){
  this.dataFn=qgsMainAppData.fn;
  this.dataFn.startPathMonitor();
  
}])//end of function qgsMainController

})();