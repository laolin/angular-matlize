'use strict';
(function(){
var cfg={
//-- start config data -----------
  //apiRoot: '../../api-qgs-shops/src',
  apiRoot: 'http://qinggaoshou.com/api-1.0',

  version: '3.01'
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
