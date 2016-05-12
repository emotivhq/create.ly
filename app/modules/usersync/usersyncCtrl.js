(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:usersyncCtrl
	* @description
	* # usersyncCtrl
	* Controller of the app
	*/

	angular
		.module('usersync')
		.controller('UsersyncCtrl', Usersync);

		Usersync.$inject = ['$scope', '$http', 'UsersyncService'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Usersync($scope, $http, UsersyncService) {
			/*jshint validthis: true */
			var vm = this;
			
			$scope.users = [];
		    UsersyncService.getUsers();
		    $scope.users = UsersyncService.users;
		    vm.users = $scope.users;

		}

})();
