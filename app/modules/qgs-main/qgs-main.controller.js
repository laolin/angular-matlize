'use strict';
(function(){

angular.module('qgs.main')
.controller('qgsMainCtrl',['$scope','$log', qgsMainController ])
  
function qgsMainController($scope,$log){
  this.headData={};
  var hd=this.headData;
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
}

})();