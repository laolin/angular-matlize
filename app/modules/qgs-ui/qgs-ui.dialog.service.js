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
    
    svc.data.answer=0;
    
    function getData() {
      return svc.data;
    }
    function setText(d,sw) {
      svc.data.title=d.title;
      svc.data.content=d.content;
      svc.data.btn1=d.btn1;
      svc.data.btn2=d.btn2;
      if(sw)show();
    }
    function show() {
      svc.data.show=true;
      svc.data.answer=0;      
    }
    function hide() {
      svc.data.show=false;
    }
    return {
      setText:setText,
      getData:getData,
      show:show,
      hide:hide
    }
    
  }
])


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  

})();