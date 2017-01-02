'use strict';

angular.module('mz-user')
.component('mzUserSearch',{
  templateUrl: 'modules/mz-user/mz-user.search.component.template.html',
  bindings: {
    searchData: '='
  },
  controller:['$scope','$http','$log','$interval','qgsMainAppData',
	function ($scope,$http,$log,$interval,qgsMainAppData) {
      $log.log('mzUserSearchResult $scope.$ctrl.searchData',$scope.$ctrl.searchData);
    }
  ]
});
