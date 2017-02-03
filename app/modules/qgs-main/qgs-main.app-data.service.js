'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppData',
    ['$route','$rootScope','$location','$log','$timeout','qgsMainApi','amapMainData','qgsMainAppDataSearch',
    function($route, $rootScope,$location,$log,$timeout,qgsMainApi,amapMainData,qgsMainAppDataSearch) {
  
  var headerData={};
  var footerData={};
  var searchData=qgsMainAppDataSearch.getSearchData();
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
    {text:'微信',icon:'comment',href:'/wx-login',hdType:2,onClick:0,active:0},
    {text:'我的',icon:'user',href:'/mz-js.my',hdType:2,onClick:0,active:0}
  ];
  
  
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