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
        var pageTo=srh.pageTo;
        if(!pageTo)pageTo='/';
        var appData=qgsMainAppData.getAppData();
        var url=appData.appCfg.apiWxAuth+"/bindwx/callback_auth?code="
          +srh._ret_code+'&app='+srh._ret_app+'&clientid='+appData.clientId;
        $http.jsonp(url).
          then(function(data) {
            if(data.data.errcode!=0) {
              $log.log('Recall Error!',data.data.errcode,data.data.msg);
              $location.path( pageTo );
            } else {
              $log.log('Recall OK!',data.data.data);
              appData.userDataService.setUserData(data.data.data);
              $location.path( pageTo ).search({});
            }
          });
      }
    ]
  })//qgsMainAppDataUser
  .when('/wx-login', {
    template: '<wx-login-auth app-data="appData" page-to="pageTo">login...</wx-login-auth>',
    controller: ['$scope','$location','$log','$interval','qgsMainAppData',
      function($scope,$location,$log,$interval,qgsMainAppData) {
        $scope.pageTo=$location.search().pageTo;
      }
	  ]
  });
}]);

})();