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
        ctrl.fn1=function() {
          ctrl.data.show=0;
          if(ctrl.data.fn1)ctrl.data.fn1()
        }
        ctrl.fn2=function() {
          ctrl.data.show=0;
          if(ctrl.data.fn2)ctrl.data.fn2()
        }
      }
    ]
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  

})();