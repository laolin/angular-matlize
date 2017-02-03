'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppDataUser',
    ['$route','$window','$location','$log','$timeout','qgsMainApi',
    function($route, $window,$location,$log,$timeout,qgsMainApi) {
  var KEY_USERDATA='_appdata.userdata';
  var userData={};
  var u_saved=JSON.parse($window.localStorage.getItem(KEY_USERDATA));
  setUserData(u_saved);
  this.userData=userData;

  
  //factory functions
  function getUserData() {
    return userData;
  }
  function setUserData(obj) {
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) userData[attr] = obj[attr];
    }
    $window.localStorage.setItem(KEY_USERDATA,JSON.stringify(userData));
    return userData;
  }
  
  return {
    getUserData:getUserData,
    setUserData:setUserData
  }
  
}]);
 
  

})();