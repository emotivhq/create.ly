'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('gsConcierge')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
		
			.state('home', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('home.dashboard', {
				url:'/dashboard',
				templateUrl: 'app/modules/home/dashboard.html'
			})
			.state('home.syncusers', {
				url:'/sync-users',
				templateUrl: 'app/modules/usersync/usersync.html'
			})
			.state('home.external', {
				url: 'https://giftstarter.com',
				external: true
			});
			
	}]);
