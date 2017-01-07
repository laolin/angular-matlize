(function(){

angular.module('amap-main')
.component('amapMain',{
    templateUrl: 'modules/amap-main/amap-main.component.template.html',  
    bindings: {
      searchData: '=',
      mapData: '=',

      mapWidth: '@',
      mapHeight: '@'
    },
    controller: ['$scope','$log','$timeout','$element','amapMainData',
      function ($scope,$log,$timeout,$element,amapMainData){
        var defWidth='100%';
        var defHeight='100%';
        $scope.$ctrl.mapWidth=defWidth;
        $scope.$ctrl.mapHeight=defHeight;
        
        amapMainData.showMapTo('amap-main-map-0');
        
      }
    ]
})

})();