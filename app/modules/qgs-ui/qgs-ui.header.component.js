'use strict';
(function(){

angular.module('qgs-ui')
.component('qgsUiHeader',{
    templateUrl: 'modules/qgs-ui/qgs-ui.header.template.html',
    controller: ['$scope','$log','$timeout', uiHeadercomponentController ],
    bindings: {
      headerData: '='
    }
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function uiHeadercomponentController($scope,$log,$timeout){
  $timeout(function(){$('select').material_select()},78);
}
  

})();