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
        
        $scope.$watch(
          function() { return $scope.$ctrl.searchData.resultTime; },
          function(newValue, oldValue) {
            var data=$scope.$ctrl.searchData.result.data;
            _gen_mark(data);
          }
        );

        var _marks=[];
        var _gen_mark=function(data) {
          if(!data)return;
          for(var i=_marks.length; i--;  ) {
            _marks[i].setMap(null);
            _marks[i]=null;
          }
          _marks=[];
          for(var i=data.length; i--;  ) {
            _marks[i]= new AMap.Marker({
              position: data[i].lnglat.split(','),
              title: data[i].name,
              animation: "AMAP_ANIMATION_DROP"
            });
            _marks[i].setMap($scope.$ctrl.mapData.map);
          }

          
        }
      }
    ]
})

})();