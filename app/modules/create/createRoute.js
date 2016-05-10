'use strict';

/**
 * @ngdoc function
 * @name app.route:createRoute
 * @description
 * # createRoute
 * Route of the app
 */

angular.module('create')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.create', {
				url:'/create',
				templateUrl: 'app/modules/create/create.html',
				controller: 'CreateCtrl',
				controllerAs: 'vm'
			});

		
	}]);
