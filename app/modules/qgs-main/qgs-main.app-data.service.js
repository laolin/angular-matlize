'use strict';
(function(){
  
var KEY_CLIENTID='QGS_appdata.clientId';


angular.module('qgs-main')
.factory('qgsMainAppData',
    ['$route','$rootScope','$location','$log','$timeout','$http','$window','qgsMainAppConfig','qgsMainApi','amapMainData','qgsMainAppDataSearch','qgsMainAppDataUser',
    function($route, $rootScope,$location,$log,$timeout,$http,$window,qgsMainAppConfig,qgsMainApi,amapMainData,qgsMainAppDataSearch,qgsMainAppDataUser) {
  
  var appCfg=qgsMainAppConfig();

  var headerData={};
  var footerData={};
  var searchData=qgsMainAppDataSearch.getSearchData();
  var userData=qgsMainAppDataUser.getUserData();
  var mapData=amapMainData.getMapData();

  var appData=this.appData={
    isWeixinBrowser:(/micromessenger/i).test(navigator.userAgent),
    clientId:'wait for init',
    appCfg:appCfg,
    
    
    headerData:headerData,
    footerData:footerData,
    searchData:searchData,
    userData:userData,
    userDataService:qgsMainAppDataUser,
    mapData:mapData
  }
  initClientId();

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
  headerData.headerText='Welcome';
  headerData.headerMenu=' ';
  
  // footerData
  footerData.tabs=[
    {text:'首页',icon:'home',href:'/',hdType:2,onClick:0,active:0},
    {text:'搜索',icon:'search',href:'/mz-user.search',hdType:1,onClick:0,active:1},
    {text:'测试',icon:'cog',href:'/mz-js.home',hdType:2,onClick:0,active:0}
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
      
      //if(! userData || !userData.token) {
      //  $location.path( "/wx-login" );
      //} else {
        activeTabByPath($location.path());
      //}
    });
  }
  
  function getSearchData() {
    return searchData;
  }

  //
  function initClientId() {
    $window
    var saved_id= $window.localStorage.getItem(KEY_CLIENTID);
    if(saved_id) {
      return appData.clientId=saved_id;
    }
      
    
    return $http.jsonp(appCfg.apiRoot+'/hello/ip').then(function(response){
      if(response.data.errcode !=0){
        appData.clientId=md5('0.0.0.0'+'~'+$location.host()+(+new Date()));//error
      } else {
        appData.clientId=md5(response.data.ip+'~'+$location.host()+(+new Date()));//
      }
      $window.localStorage.setItem(KEY_CLIENTID,appData.clientId);
    });
  }
  
  return {
    getSearchData:getSearchData,
    
    activeTabByPath:activeTabByPath,
    activeTabByIndex:activeTabByIndex,
    startPathMonitor:startPathMonitor,
    getHeaderData:function(){return headerData},
    getFooterData:function(){return footerData},
    getAppData:function(){return appData},
    getUserData:function(){return userData}
  }
  
}]);
 
  

})();