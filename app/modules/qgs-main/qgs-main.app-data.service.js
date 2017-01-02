'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppData',[ '$route', '$rootScope', '$location','$log','$timeout','qgsMainApi',
    function($route, $rootScope,$location,$log,$timeout,qgsMainApi) {
  
  var headerData=this.headerData={};
  var footerData=this.footerData={};
  var searchData=this.searchData={result:0,searching:0};
  var userData=this.userData={test1:'[it is ready]'};

  var appData=this.appData={
    headerData:this.headerData,
    footerData:this.footerData,
    searchData:this.searchData,
    userData:this.userData,
  }
  
 
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
    {text:'首页',icon:'home',href:'/mz-js.home',hdType:1,onClick:0,active:0},
    {text:'搜索',icon:'search',href:'/mz-user.search',hdType:1,onClick:0,active:1},
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
  
  function startSearch(w) {
    $log.log('Search word is '+w);
    searchData.searching=true;
    searchData.result=qgsMainApi.search.get({s:w},function(){searchData.searching=false;});
  }
  function getSearchData() {
    return searchData;
  }
  
  return {
    startSearch:startSearch,
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