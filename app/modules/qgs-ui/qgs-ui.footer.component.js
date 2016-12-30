'use strict';
(function(){

angular.module('qgs-ui')
.component('qgsUiFooter',{
    templateUrl: 'modules/qgs-ui/qgs-ui.footer.template.html',
    controller: ['$scope','$log','$timeout', uiController ],
    bindings: {
      footerData: '='
    }
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function uiController($scope,$log,$timeout){
  $scope.$ctrl.clickTab = function (nt) {
    for(var i=$scope.$ctrl.footerData.tabs.length;i--; ){
      $scope.$ctrl.footerData.tabs[i].active=false;
    }
    $scope.$ctrl.footerData.tabs[nt].active=true;
    if(typeof($scope.$ctrl.footerData.tabs[nt].onClick)=='function')$scope.$ctrl.footerData.tabs[nt].onClick();
    return true;
  }
}
  

})();