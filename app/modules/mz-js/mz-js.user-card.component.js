'use strict';
(function(){

angular.module('qgs-ui')
.component('mzJsUserCard',{
    templateUrl: 'modules/mz-js/mz-js.user-card.component.template.html',  
    bindings: {
      userData: '='
    },
    controller: ['$scope','$log','$timeout','qgsMainAppData',
      function ($scope,$log,$timeout,qgsMainAppData){
        //$scope.$ctrl.userData;
      }
    ]
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  

})();