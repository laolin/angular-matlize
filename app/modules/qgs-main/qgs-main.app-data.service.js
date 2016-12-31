'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppData',[ '$route', '$rootScope', '$location','$log','$timeout','qgsMainApi',
    function($route, $rootScope,$location,$log,$timeout,qgsMainApi) {
  
  this.headerData={};
  this.footerData={};
  this.searchData={s:0,searching:0};

  
  var hd=this.headerData;
  var sd=this.searchData;
  
  hd.type=1;
  hd.logoUri='assets/img/logo-32.png';
  hd.citysData = qgsMainApi.cityList.get(function(value,responseHeaders,status,statusText ){
      //$log.log(value,responseHeaders,status,statusText );
      $log.log('hd.citysData',hd.citysData);
      hd.citys=hd.citysData.data;
      hd.city=hd.citys[0];
      $timeout(function(){$('select').material_select()},78);
    });
  hd.citys = [];
  hd.city='';
  
  
  hd.leftLink='.';
  hd.headerText='查看消息';
  hd.headerMenu='账单详情';
  
  var ft=this.footerData;
  ft.tabs=[
    {text:'首页',icon:'home',href:'/mz-js.home',hdType:1,onClick:0,active:0},
    {text:'搜索',icon:'search',href:'/mz-user.search',hdType:1,onClick:0,active:1},
    {text:'我的',icon:'user',href:'/mz-js.my',hdType:2,onClick:0,active:0}
  ];
  
  
  //factory functions
  
  
  
  function activeTabByPath(p) {
    $log.log('activeTabByPath',p);
    for(var i=ft.tabs.length;i--; ){
      if(ft.tabs[i].href==p)break;
    }
    if(i<0)return true;
    return activeTabByIndex(i);
  }

  function activeTabByIndex(nt) {
    $log.log('activeTabByIndex',nt);
    for(var i=ft.tabs.length;i--; ){
      ft.tabs[i].active=false;
    }
    ft.tabs[nt].active=true;
    hd.type=ft.tabs[nt].hdType;
    if(typeof(ft.tabs[nt].onClick)=='function')ft.tabs[nt].onClick();
    return true;
  }
  
  function startPathMonitor() {
    $rootScope.$on('$routeChangeSuccess', function() {
      activeTabByPath($location.path());
    });
  }
  
  function startSearch(w) {
    $log.log('Search word is '+w);
    sd.s=qgsMainApi.search.get({s:w});
    sd.searching=true;
  }
  function getSearchData() {
    return sd;
  }
  
  return {
    startSearch:startSearch,
    getSearchData:getSearchData,
    
    activeTabByPath:activeTabByPath,
    activeTabByIndex:activeTabByIndex,
    startPathMonitor:startPathMonitor,
    getHeaderData:function(){return hd},
    getFooterData:function(){return ft}
  }
  
}]);
 
  

})();