'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppConfig',[ '$log',
  function( $log) {
    this.config={};
    var cfg=this.config;
    
    //-- start config data -----------
    cfg.version=2.01;
    cfg.apiRoot='../../Api-core/src';
    
    //-- end config data -----------
    return function(){return cfg;}
  }
]);

})();
