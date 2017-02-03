'use strict';
(function(){

angular.module('qgs-main')
.factory('qgsMainAppDataUser',
    ['$route','$rootScope','$location','$log','$timeout','qgsMainApi',
    function($route, $rootScope,$location,$log,$timeout,qgsMainApi) {
  
  var userData={};
  this.userData=userData;

  
  //factory functions
  function getUserData() {
    return userData;
  }
  function setUserData(obj) {
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) userData[attr] = obj[attr];
    }
    return userData;
  }
  
  return {
    getUserData:getUserData,
    setUserData:setUserData
  }
  
}]);
 
  

})();