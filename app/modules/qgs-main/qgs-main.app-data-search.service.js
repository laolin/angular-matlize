'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppDataSearch',
    ['$route','$location','$log','qgsMainApi','amapMainData','qgsMainAppDataUser',
    function($route,$location,$log,qgsMainApi,amapMainData,qgsMainAppDataUser) {
  
  var searchData={};
  var mapData=amapMainData.getMapData();

  searchData.result=0;
  searchData.resultSelected=-1;
  searchData.searching=0;
  searchData.resultTime=0;
  searchData.options={orderBy:'auto',searchInsideMap:true,countRes:20};
  searchData.searchWord='';
  searchData.searchPlaceholder='商户名称/地址/电话';
  searchData.searchList = []; //TODO: values will get from API

  searchData.clearSearchWord=function(){
    searchData.searchWord='';
  }
  searchData.searchAroundSelected=function(){
    var dist=500 * 100;// 大约500米
    var i=searchData.resultSelected;
    if(i<0 || i>=searchData.result.data.length)return;
    var lnglat=searchData.result.data[i].lnglat.split(',');
    var serchPara={};//={s:searchData.searchWord};
    serchPara.latlng= //以下算法假定经纬度都不会因为+/-500米后出现无效度数。
      Math.floor( 1e7 * lnglat[1]-dist ) + ',' +
      Math.floor( 1e7 * lnglat[0]-dist  ) + ',' +
      Math.floor( 1e7 * lnglat[1]+dist  ) + ',' +
      Math.floor( 1e7 * lnglat[0]+dist  );
    _doSearch(serchPara);
  }
  
  searchData.selectResult=function(i) {
    if(searchData.resultSelected==i)i=-1;
    searchData.resultSelected=i;
    if(!mapData.infoWindow)return;
    if(i<0)return mapData.infoWindow.close();
    var lnglat=searchData.result.data[i].lnglat.split(',');
    mapData.infoWindow.setPosition(lnglat);
    
    mapData.infoWindow.setContent('['+(1+i)+']'+searchData.result.data[i].name);
    mapData.infoWindow.open(mapData.map);
  }
  searchData.startSearch=function(){
    var bd;
    var serchPara={s:searchData.searchWord};

    if(mapData.map) {
      mapData.infoWindow.close();
      bd=mapData.map.getBounds( );
      mapData.northeast=bd.northeast;
      mapData.southwest=bd.southwest;
      if(searchData.options.searchInsideMap) {
        serchPara.latlng= 
          Math.floor(1e7 * mapData.southwest.lat ) + ',' +
          Math.floor(1e7 * mapData.southwest.lng ) + ',' +
          Math.floor(1e7 * mapData.northeast.lat ) + ',' +
          Math.floor(1e7 * mapData.northeast.lng );
      }
      
    }
    $log.log('serchPara ', serchPara);
    _doSearch(serchPara);
  }
  function _doSearch(serchPara){
    serchPara.count=searchData.options.countRes;
    searchData.searching=true;
    searchData.resultSelected=-1;
    searchData.result=qgsMainApi.search.get(
      qgsMainAppDataUser.addApiSignature(serchPara,'foot','search'),
      function(){
        searchData.searching=false;
        searchData.resultTime= +new Date();//用来标记搜索结果是否更新
        var maxlat=-555;
        var maxlng=-555;
        var minlat=555;
        var minlng=555;
        var lnglat;
        for(var i=searchData.result.data.length; i-- ; ) {
          lnglat=searchData.result.data[i].lnglat.split(',');
          if(lnglat[0]==0 && lnglat[1]==0)continue;//0,0是没有数据，忽略。
          maxlng=Math.max(maxlng,lnglat[0]);
          minlng=Math.min(minlng,lnglat[0]);
          maxlat=Math.max(maxlat,lnglat[1]);
          minlat=Math.min(minlat,lnglat[1]);
        }
        $log.log({lng:minlng,lat:minlat},{lng:maxlng,lat:maxlat});
        if(mapData.map) {
          mapData.map.setBounds(new AMap.Bounds([minlng,minlat],[maxlng,maxlat]))
        }
      }
    );

    $location.url('/mz-user.search');
  }
  
  //factory functions
  function getSearchData() {
    return searchData;
  }
  
  return {
    getSearchData:getSearchData,
  }
  
}]);
 
  

})();