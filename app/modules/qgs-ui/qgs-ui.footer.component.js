'use strict';
(function(){

angular.module('qgs-ui')
.component('qgsUiFooter',{
    templateUrl: 'modules/qgs-ui/qgs-ui.footer.template.html',  
    bindings: {
      footerData: '='
    },
    controller: ['$scope','$log','$timeout','qgsMainAppData',
      function ($scope,$log,$timeout,qgsMainAppData){
        $scope.$ctrl.clickTab = qgsMainAppData.fn.activeTabByIndex; 
    }]
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  

})();