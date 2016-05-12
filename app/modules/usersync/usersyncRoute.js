'use strict';

/**
 * @ngdoc function
 * @name app.route:usersyncRoute
 * @description
 * # usersyncRoute
 * Route of the app
 */

angular.module('usersync')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.usersync', {
				url:'/usersync',
				templateUrl: 'app/modules/usersync/usersync.html',
				controller: 'UsersyncCtrl',
				controllerAs: 'vm'
			});

		
	}]);
