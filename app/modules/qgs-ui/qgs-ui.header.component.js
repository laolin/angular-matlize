'use strict';
(function(){

angular.module('qgs-ui')
.component('qgsUiHeader',{
    templateUrl: 'modules/qgs-ui/qgs-ui.header.template.html',
    bindings: {
      headerData: '=',
      searchData: '='
    },
    controller: ['$scope','$log','$timeout','$location','qgsMainAppData', function ($scope,$log,$timeout,$location,qgsMainAppData){
   
      
    }]
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  

})();