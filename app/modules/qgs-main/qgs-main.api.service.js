'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainApi',['$log','$resource','qgsMainAppConfig','qgsMainAppDataUser',
  function($log,$resource,qgsMainAppConfig,qgsMainAppDataUser) {
    
    
    this.appCfg=qgsMainAppConfig();
    $log.log('cfg:',this.appCfg);

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
          params: { s:'@s'}
        }
      }),
    };//end of return
  }//end of factory's ctrl function
]);//end of factory
 
  

})();