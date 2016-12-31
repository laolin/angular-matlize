'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppData',[ '$route',  '$rootScope', '$location','$log',
    function($route, $rootScope,$location,$log) {
  
  this.headerData={};
  var hd=this.headerData;
  hd.type=1;
  hd.logoUri='assets/img/logo-32.png';
  hd.citys = [
    '上海',
    '北京',
    '深圳',
    '乌鲁木齐'
  ];
  hd.city='上海';
  hd.searchWord='';
  hd.searchPlaceholder='请输入技师名称、商户名称';
  hd.searchList = []; //TODO: values will get from API
  hd.clearSearchWord=function(){
    hd.searchWord='';
  }
  
  //TODO: 
  hd.startSearch=function(){
    $log.log('Under development. Search word is '+hd.searchWord);
  }
  
  hd.leftLink='.';
  hd.headerText='查看消息';
  hd.headerMenu='账单详情';
  
  this.footerData={};
  var ft=this.footerData;
  ft.tabs=[
    {text:'首页',icon:'home',href:'/mz-js.home',hdType:1,onClick:0,active:0},
    {text:'test',icon:'cog',href:'/index',hdType:2,onClick:0,active:1},
    {text:'我的',icon:'user',href:'/mz-js.my',hdType:1,onClick:0,active:0}
  ];
  
  
  //factory functions
  
  
  
  function activeTabByPath(p) {
    for(var i=ft.tabs.length;i--; ){
      if(ft.tabs[i].href==p)break;
    }
    if(i<0)return true;
    return activeTabByIndex(i);
  }

  function activeTabByIndex(nt) {
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

  return {
    fn:{
      activeTabByPath:activeTabByPath,
      activeTabByIndex:activeTabByIndex,
      startPathMonitor:startPathMonitor,
      getHeaderData:function(){return hd},
      getFooterData:function(){return ft}
    }
  }
  
}]);
 
  

})();