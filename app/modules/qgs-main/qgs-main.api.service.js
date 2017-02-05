'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainApi',['$log','$resource','qgsMainAppConfig','qgsMainAppDataUser',
  function($log,$resource,qgsMainAppConfig,qgsMainAppDataUser) {
    
    
    this.appCfg=qgsMainAppConfig();
    $log.log('cfg:',this.appCfg);
    
    var genSignature=function(dat,api,call) {
      var user=qgsMainAppDataUser.getUserData();
      $log.log('user:',user);
      var dt=new Date()
      var tim=Math.round(dt.getTime()/1000) -8*3600- dt.getTimezoneOffset()*60;//修正为东8区
 
      dat.uid=user.uid;
      dat.tokenid=user.tokenid;
      
      dat.timestamp= tim;
      dat.api_signature=md5(api+call+user.uid+user.token+tim);
      $log.log('md5:',api+call+user.uid+user.token+tim,dat);
      return dat;
    }
    

    return {
      cityList: $resource( this.appCfg.apiRoot+'/mzapi/citylist' , {} , {
        get: {
          method: 'JSONP',
          params: { }
        }
      }),
      reginList: $resource( this.appCfg.apiRoot+'/mzapi/reginlist' , {} , {
        get: {
          method: 'JSONP',
          params: { }
        }
      }),
      search: $resource( this.appCfg.apiRoot+'/foot/search' , {} , {
        get: {
          method: 'JSONP',
          params: genSignature({ s:'@s'},'foot','search')
        }
      }),
    };//end of return
  }//end of factory's ctrl function
]);//end of factory
 
  

})();