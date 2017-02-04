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
  function saveUserDataToLocalStorage() {
    $window.localStorage.setItem(KEY_USERDATA,JSON.stringify(userData));
  }
  function setUserData(obj) {
    for (var attr in userData) {//由于外部引用了userData变量，故不能重赋值。只能修改属性。
      if (obj.hasOwnProperty(attr)) delete userData[attr];
    }
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) userData[attr] = obj[attr];
    }
    saveUserDataToLocalStorage();
    return userData;
  }
  
  return {
    saveUserDataToLocalStorage:saveUserDataToLocalStorage,
    getUserData:getUserData,
    setUserData:setUserData
  }
  
}]);
 
  

})();