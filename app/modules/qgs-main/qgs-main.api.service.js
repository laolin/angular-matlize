'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainApi',['$log','$resource','qgsMainAppConfig',
  function($log,$resource,qgsMainAppConfig) {
    
    
    this.appCfg=qgsMainAppConfig();
    $log.log('cfg:',this.appCfg);
    

    return {
      cityList: $resource( this.appCfg.apiRoot+'/mzapi/citylist' , {} , {
        get: {
          method: 'JSONP',
          params: {callback: 'JSON_CALLBACK'}
        }
      }),
      search: $resource( this.appCfg.apiRoot+'/foot/search' , {} , {
        get: {
          method: 'JSONP',
          params: {callback: 'JSON_CALLBACK',s:'@s'}
        }
      }),
    };//end of return
  }//end of factory's ctrl function
]);//end of factory
 
  

})();