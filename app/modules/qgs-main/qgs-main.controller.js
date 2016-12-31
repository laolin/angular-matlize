'use strict';
(function(){

angular.module('qgs-main')
.controller('qgsMainCtrl',['$scope','$log','qgsMainAppData', function ($scope,$log,qgsMainAppData){
  this.getHeaderData=qgsMainAppData.getHeaderData;
  this.getFooterData=qgsMainAppData.getFooterData;
  
}])//end of function qgsMainController

})();