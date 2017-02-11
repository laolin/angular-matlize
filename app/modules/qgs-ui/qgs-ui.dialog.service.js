'use strict';
(function(){

angular.module('qgs-ui')
.factory('qgsUiDialogService', 
  ['$log','$timeout',
  function ($log,$timeout){

    var svc=this;
    svc.data={}
    svc.data.show=false;
    svc.data.title='Hello';
    svc.data.content='Message';
    svc.data.btn1='OK';
    svc.data.btn2='Option2';
    svc.data.fn1=false;
    svc.data.fn2=false;
    
    function getData() {
      return svc.data;
    }
    function setData(d) {
      svc.data.title=d.title;
      svc.data.content=d.content;
      svc.data.btn1=d.btn1;
      svc.data.btn2=d.btn2;
      svc.data.fn1=d.fn1;
      svc.data.fn2=d.fn2;
      svc.data.show=d.show;
    }
    function show() {
      svc.data.show=true;
    }
    function hide() {
      svc.data.show=false;
    }
    return {
      setData:setData,
      getData:getData,
      show:show,
      hide:hide
    }
    
  }
])


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  

})();