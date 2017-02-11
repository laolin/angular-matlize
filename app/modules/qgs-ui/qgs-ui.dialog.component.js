'use strict';
(function(){

angular.module('qgs-ui')
.component('qgsUiDialog',{
    templateUrl: 'modules/qgs-ui/qgs-ui.dialog.component.template.html',  
    bindings: { 
      data: "="
    },
    controller: ['$scope','$log','$timeout','qgsMainAppData',
      function ($scope,$log,$timeout,qgsMainAppData){
        var ctrl=this;

      }
    ]
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  

})();