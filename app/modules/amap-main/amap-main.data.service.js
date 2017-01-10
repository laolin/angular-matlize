(function(){

angular.module('amap-main')
.factory('amapMainData', ['$log','$timeout',
      function ($log,$timeout){
        var mapData={
          options:{zoom: 10},
          inInit:0 //表示是否正在初始化
        };
        mapData.showMapTo=showMapTo;
        
        
        initMap();
        return {
          initMap:initMap,
          showMapTo:showMapTo,
          setMapOptions:setMapOptions,
          getMapData:function () {return mapData}
        };
        
        
        
        
        function setMapOptions(o){
          for (var k in o){
            mapData.options[k] = o[k]; 
          }
        }
        
        // showMap
        function showMapTo(element_id,options) {
          if(typeof(options)=='object')setMapOptions(options);
          if(typeof(mapData.map)=='undefined')initMap(options);
          $timeout(wait_show_map, 1);
          
          function wait_show_map() {
            if(typeof (mapData.map) == 'undefined') {
              $timeout(wait_show_map, 100);
            } else {
              
              //如果已显示在别的地方，就先从别的地方删掉
              if(mapData.div.parentNode) {
                mapData.div.parentNode.removeChild(mapData.div);
              }

              var ele=document.getElementById(element_id);
              ele.innerHTML='';
              //地图放在指定的地方
              ele.appendChild(mapData.div);
            }
          }
        }
        
        // initMap
        function initMap(options) {
          if(mapData.inInit)return;
          $log.log("Loading AMap ...",mapData.inInit);
          mapData.inInit=true;
          
          if(typeof(options)=='object')setMapOptions(options);
          if(typeof (AMap) == 'undefined')loadMapScript()
          $timeout(wait_init_map, 10);
          
          function wait_init_map() {
            $log.log("wait_init_map ...");
            if(typeof (AMap) == 'undefined' 
                || typeof (AMap.ToolBar) == 'undefined'
                || typeof (AMap.Geocoder) == 'undefined'
                || typeof (AMap.Map) == 'undefined'
                ) {
              $timeout(wait_init_map, 100);
            }
            else
              _init_map();
              mapData.inInit=false;
          }
          //initMap 直接执行的语句结束
          
          //以下为initMap的内部函数
          function _init_map() {
            $log.log("Init AMap ...");
            if(mapData.map)return;
            mapData.div = document.createElement("div");
            mapData.div.id='map-contain-'+(+new Date());
            mapData.div.style.height="100%";
            mapData.div.style.width="100%";
            
            //目前不知道显示在哪，但 AMap.Map 要求在放在 body 内，所以隐藏后再加到 body 后
            mapData.div.style.display="none";
            document.body.appendChild(mapData.div);
            mapData.map = new AMap.Map(mapData.div.id, mapData.options);
            mapData.map.addControl(new AMap.ToolBar());
            _saveMapBounds();
            mapData.map.on('moveend',_saveMapBounds);
            mapData.map.on('zoomend',_saveMapBounds);
            mapData.map.on('resize',_saveMapBounds);
            
            //初始化地图后，再从 body 中移走
            mapData.div.parentNode.removeChild(mapData.div);
            mapData.div.style.display='';
          }
          function _saveMapBounds(msg) {
            $log.log('_saveMapBounds',msg);
            var bd=mapData.map.getBounds( );
            mapData.northeast=bd.northeast;
            mapData.southwest=bd.southwest;
          }
          function loadMapScript() {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = location.protocol + 
            "//webapi.amap.com/maps?v=1.3&key=b4a551eacfbb920a6e68b5eca1126dd5" + 
            "&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder,AMap.Scale,AMap.OverView,AMap.ToolBar";
            document.body.appendChild(script);
          }
        }
        
      }
    ]
)


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;



})();