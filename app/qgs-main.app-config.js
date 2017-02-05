'use strict';
(function(){
var cfg={
//-- start config data -----------
  //apiRoot: '../../api-qgs-shops/src',
  apiRoot: 'http://api.qinggaoshou.com/api-1.0', //一般的API
  apiWxAuth: 'http://qinggaoshou.com/api-1.0', //WX 授权 callback 域名限制的URI

  version: '3.01'
//-- end config data -----------
}
angular.module('qgs-main')
.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    cfg.apiRoot+"/**",
    cfg.apiWxAuth+"/**",
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
