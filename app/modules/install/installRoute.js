'use strict';

/**
 * @ngdoc function
 * @name app.route:installRoute
 * @description
 * # installRoute
 * Route of the app
 */

angular.module('install')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.install', {
				url:'/install',
				templateUrl: 'app/modules/install/install.html',
				controller: 'InstallCtrl',
				controllerAs: 'vm'
			});

		
	}]);
