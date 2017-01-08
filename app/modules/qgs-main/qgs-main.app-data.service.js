'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppData',
    ['$route','$rootScope','$location','$log','$timeout','qgsMainApi','amapMainData',
    function($route, $rootScope,$location,$log,$timeout,qgsMainApi,amapMainData) {
  
  var headerData={};
  var footerData={};
  var searchData={};
  var userData={test1:'[it is ready]'};
  var mapData=amapMainData.getMapData();

  var appData=this.appData={
    headerData:headerData,
    footerData:footerData,
    searchData:searchData,
    userData:userData,
    mapData:mapData
  }
  window.appData=appData;//export to global
 
  // headerData
  headerData.type=1;
  headerData.logoUri='assets/img/logo-32.png';
  headerData.citySelected='loading';
  headerData.cityData = qgsMainApi.cityList.get(function(value,responseHeaders,status,statusText ){
      headerData.citySelected=headerData.cityData.data[0];
      $timeout(function(){$('select').material_select()},78);
    });
  
  
  headerData.leftLink='.';
  headerData.headerText='查看消息';
  headerData.headerMenu='账单详情';
  
  // footerData
  footerData.tabs=[
    {text:'搜索',icon:'search',href:'/mz-user.search',hdType:1,onClick:0,active:1},
    {text:'测试',icon:'cog',href:'/mz-js.home',hdType:2,onClick:0,active:0},
    {text:'我的',icon:'user',href:'/mz-js.my',hdType:2,onClick:0,active:0}
  ];
  
  //searchData
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
  
  // madData
  amapMainData.initMap();
  
  
  //factory functions
  
  
  
  function activeTabByPath(p) {
    $log.log('activeTabByPath',p);
    for(var i=footerData.tabs.length;i--; ){
      if(footerData.tabs[i].href==p)break;
    }
    if(i<0)return true;
    return activeTabByIndex(i);
  }

  function activeTabByIndex(nt) {
    $log.log('activeTabByIndex',nt);
    for(var i=footerData.tabs.length;i--; ){
      footerData.tabs[i].active=false;
    }
    footerData.tabs[nt].active=true;
    headerData.type=footerData.tabs[nt].hdType;
    if(typeof(footerData.tabs[nt].onClick)=='function')footerData.tabs[nt].onClick();
    return true;
  }
  
  function startPathMonitor() {
    $rootScope.$on('$routeChangeSuccess', function() {
      activeTabByPath($location.path());
    });
  }
  
  function getSearchData() {
    return searchData;
  }
  
  return {
    getSearchData:getSearchData,
    
    activeTabByPath:activeTabByPath,
    activeTabByIndex:activeTabByIndex,
    startPathMonitor:startPathMonitor,
    getHeaderData:function(){return headerData},
    getFooterData:function(){return footerData},
    getAppData:function(){return appData}
  }
  
}]);
 
  

})();