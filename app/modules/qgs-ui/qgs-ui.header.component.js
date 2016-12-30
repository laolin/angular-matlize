'use strict';
(function(){

angular.module('qgs.ui')
.component('qgsUiHeader',{
    templateUrl: 'modules/qgs-ui/qgs-ui.header.template.html',
    controller: ['$scope','$log','$timeout', uiHeadercomponentController ],
    bindings: {
      headData: '='
    }
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function uiHeadercomponentController($scope,$log,$timeout){
  $log.log('headData');
  $log.log($scope.$ctrl.headData);
  $timeout(function(){$('select').material_select()},78);

}
  

})();