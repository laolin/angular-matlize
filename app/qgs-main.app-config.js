'use strict';
(function(){
var cfg={
//-- start config data -----------
  apiRoot: '../../Api-core/src',

  version: '2.02'
//-- end config data -----------
}
angular.module('qgs-main')
.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    cfg.apiRoot+"/**",
    'self'
  ]);
}])
.factory('qgsMainAppConfig',[ '$log',
  function( $log) {
    this.config=cfg;    
    return function(){return cfg;}
  }
]);

})();
