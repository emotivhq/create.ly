(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:usersyncService
	 * @description
	 * # usersyncService
	 * Service of the app
	 */

	angular
		.module('usersync')
		.factory('UsersyncService', Usersync);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Usersync.$inject = ['$http', '$scope'];

		function Usersync ($http, $scope) {
			var vm = this;
			$scope.users = [];
			vm.getUsers = function ($index) {
				$http.get('users.json').success(function(data) {
					vm.users = data;
				});
			};

		}

})();
