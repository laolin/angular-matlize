'use strict';
(function(){

angular.module('ui.header')
.controller('uiHeader',['$scope','$log', uiHeaderController ])
.component('mycUiHeader',{
    templateUrl: 'modules/ui-header/ui-header.template.html',
    controller: ['$scope','$log','$timeout', uiHeadercomponentController ],
    bindings: {
      headData: '='
    }
})


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
function uiHeadercomponentController($scope,$log,$timeout){
  $log.log('headData');
  $log.log($scope.$ctrl.headData);
  $timeout(function(){$('select').material_select()},78);

}
  
function uiHeaderController($scope,$log){
  this.headData={};
  var hd=this.headData;
  hd.type=2;
  hd.logoUri='assets/img/logo-32.png';
  hd.citys = [
    '上海',
    '北京',
    '深圳',
    '乌鲁木齐'
  ];
  hd.city='上海';
  hd.searchWord='';
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