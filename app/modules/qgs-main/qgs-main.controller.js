'use strict';
(function(){

angular.module('qgs-main')
.controller('qgsMainCtrl',['$scope','$log', qgsMainController ])
  
function qgsMainController($scope,$log){
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
    {text:'首页',icon:'home',href:'#!/index',onClick:function(){hd.type=1;},active:1},
    {text:'首页2',icon:'car',href:'#!/home',onClick:function(){hd.type=2;},active:0},
    {text:'首页3',icon:'bicycle',href:'#!/home',onClick:'',active:0},
    {text:'首页5',icon:'cog',href:'#!/home',onClick:'',active:''},
    {text:'我的',icon:'user',href:'#!/mz-js.my',onClick:function(){hd.type=1;},active:0}
  ];

  
}//end of function qgsMainController

})();