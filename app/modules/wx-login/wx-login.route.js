'use strict';

angular.module('wx-login')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wx-callback', {
    template:'<div>calling back!</div>',
    controller: ['$scope','$log','$location','$http','qgsMainAppConfig','qgsMainAppDataUser','qgsMainAppData',
      function($scope,$log,$location,$http,qgsMainAppConfig,qgsMainAppDataUser,qgsMainAppData) {
        var parseQueryString = function() {
          var str = window.location.search;
          var objURL = {};
          str.replace(
            new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
            function( $0, $1, $2, $3 ){
              objURL[ $1 ] = decodeURIComponent($3);
            }
          );
          return objURL;
        };
        var srh=parseQueryString();
        var url=qgsMainAppConfig().apiRoot+"/bindwx/callback_auth?code="
          +srh._ret_code+'&app='+srh._ret_app;
        $http.jsonp(url).
          then(function(data, status, headers, config) {
            if(data.data.errcode!=0) {
              $log.log('Recall Error!2',data.data.errcode,data.data.msg);
              $location.path( "/" );
            } else {
              $log.log('Recall OK!2',data.data.data);
              qgsMainAppDataUser.setUserData(data.data.data);
              $location.path( "/" );
            }
          });
      }
    ]
  })
  .when('/wx-login', {
    templateUrl: 'modules/wx-login/wx-login.template.html',
    controller: ['$scope','$location','$log','$interval','qgsMainAppConfig','qgsMainAppDataUser',
      function($scope,$location,$log,$interval,qgsMainAppConfig,qgsMainAppDataUser) {
        var ud=qgsMainAppDataUser.getUserData();             
        if(ud.token) {
          $location.path( "/" );
          return;
        }

        var wx_src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js";

        if(typeof(WxLogin)=='undefined') {
          jQuery.getScript( wx_src , _wx_login )
        } else {
          _wx_login();
        }

          
        function _wx_login() {
          var obj = new WxLogin({
            id:"login_container_3", 
            appid: "wx8fb342a27567fee7", //qgs-web
            scope: "snsapi_login", 
            
            redirect_uri: qgsMainAppConfig().apiRoot+"/bindwx/callback_xdom", 
            state: encodeURIComponent("cb_xd~qgs-web~"+encodeURIComponent(location.href.split("#")[0]+"#!/wx-callback")),
            style: "",
            href: ""
          });
        }
      }
	  ]
  });
}]);
