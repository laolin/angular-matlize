'use strict';
(function(){
var cfg={
//-- start config data -----------
  //apiRoot: '../../api-qgs-shops/src',
  apiRoot: 'http://api.qinggaoshou.com/api-1.0', //一般的API
  apiWxAuth: 'http://qinggaoshou.com/api-1.0', //WX 授权 callback 域名限制的URI

  wxApp:[
    {name:'qgs-web',id:'wx8fb342a27567fee7'},
    {name:'qgs-mp',id:'wx93301b9f5ddf5c8f'}
  ],
  version: '4.00'
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
