'use strict';
(function(){
var MARK_API_CALLBACK='cb_xd';//和后端API的约定字符串

angular.module('wx-login')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wx-callback', {
    template:' ',
    controller: ['$scope','$log','$location','$http','qgsMainAppData',
      function($scope,$log,$location,$http,qgsMainAppData) {
        var srh=$location.search();
        var appData=qgsMainAppData.getAppData();
        var url=appData.appCfg.apiWxAuth+"/bindwx/callback_auth?code="
          +srh._ret_code+'&app='+srh._ret_app+'&clientid='+appData.clientId;
        $http.jsonp(url).
          then(function(data, status, headers, config) {
            if(data.data.errcode!=0) {
              $log.log('Recall Error!2',data.data.errcode,data.data.msg);
              $location.path( "/" );
            } else {
              $log.log('Recall OK!2',data.data.data);
              appData.userDataService.setUserData(data.data.data);
              $location.path( "/" );
            }
          });
      }
    ]
  })//qgsMainAppDataUser
  .when('/wx-login', {
    templateUrl: 'modules/wx-login/wx-login.template.html',
    controller: ['$scope','$location','$log','$interval','qgsMainAppData',
      function($scope,$location,$log,$interval,qgsMainAppData) {
        var appData=qgsMainAppData.getAppData();             
        if(appData.userData.token) {
          $location.path( "/" );
          return;
        }
        var api_wx=appData.appCfg.apiWxAuth+ "/bindwx/callback_bridge/" +
              btoa(location.href.split("#")[0]+"#!/wx-callback");
        var inx=appData.isWeixinBrowser?1:0;
        //1: 在微信里打开
        if(inx) {
           var wxAuth=
           'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
           appData.appCfg.wxApp[inx].id + 
           '&redirect_uri=' + api_wx +
           '&response_type=code&scope=snsapi_userinfo&state=' + 
           MARK_API_CALLBACK+"~"+appData.appCfg.wxApp[inx].name + 
           '#wechat_redirect';
           location.href=wxAuth;
          return;
        }
        
        //2：不在微信里打开

        var wx_src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js";

        if(typeof(WxLogin)=='undefined') {
          jQuery.getScript( wx_src , _wx_login )
        } else {
          _wx_login();
        }
          
        function _wx_login() {
          var obj = new WxLogin({
            id:"login_container_3", 
            appid: appData.appCfg.wxApp[inx].id,
            scope: "snsapi_login", 
            
            redirect_uri: api_wx , 
            state: MARK_API_CALLBACK+"~"+appData.appCfg.wxApp[inx].name,
            style: "",
            href: ""
          });
        }
      }
	  ]
  });
}]);

})();