'use strict';
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
        var ctrl=this;
        var defWidth='100%';
        var defHeight='100%';
        $scope.$ctrl.mapWidth=defWidth;
        $scope.$ctrl.mapHeight=defHeight;
        
        amapMainData.showMapTo('amap-main-map-0');
        
        $scope.$watch(
          function() { return ctrl.searchData.resultTime; },
          function(newValue, oldValue) {
            var data=ctrl.searchData.result.data;
            _gen_mark(data);
          }
        );

        var _marks=[];
        var _on_mark_click=function(o) {
          var i=o.target.__index;
          ctrl.searchData.resultActiveIndex=i;
          var lnglat=o.lnglat;
          
        }
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
              //content
              label:{content:1+i,offset:{x:0,y:-20}},
              animation: "AMAP_ANIMATION_DROP"
            });
            _marks[i].__index=i; //标记，给on click用的 （不知道如何把i传给回调函数）
            _marks[i].on('click',function(o){_on_mark_click(o)});
            _marks[i].setMap(ctrl.mapData.map);
          }

          
        }
      }
    ]
})

})();