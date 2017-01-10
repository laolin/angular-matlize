'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppDataSearch',
    ['$route','$rootScope','$location','$log','$timeout','qgsMainApi','amapMainData',
    function($route, $rootScope,$location,$log,$timeout,qgsMainApi,amapMainData) {
  
  var searchData={};
  var mapData=amapMainData.getMapData();

  searchData.result=0;
  searchData.searching=0;
  searchData.resultTime=0;
  searchData.options={orderBy:'auto',searchInsideMap:true};
  searchData.searchWord='';
  searchData.searchPlaceholder='商户名称/地址/电话';
  searchData.searchList = []; //TODO: values will get from API

  searchData.clearSearchWord=function(){
    searchData.searchWord='';
  }

  searchData.startSearch=function(){
    var bd;
    var serchPara={s:searchData.searchWord};

    if(mapData.map) {
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
    
    searchData.searching=true;
    searchData.result=qgsMainApi.search.get(
      serchPara,
      function(){searchData.searching=false;searchData.resultTime= +new Date()}
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