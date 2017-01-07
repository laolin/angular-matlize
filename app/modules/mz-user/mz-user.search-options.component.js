'use strict';

angular.module('mz-user')
.component('mzUserSearchOptions',{
  templateUrl: 'modules/mz-user/mz-user.search-options.component.template.html',
  bindings: {
    searchData: '='
  },
  controller:['$scope','$http','$log','$interval','qgsMainAppData',
	function ($scope,$http,$log,$interval,qgsMainAppData) {
      $scope.$ctrl.specialValue={
         "id": "12345",
         "value": "green"
      };
    }
  ]
});
