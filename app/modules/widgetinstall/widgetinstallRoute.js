'use strict';

/**
 * @ngdoc function
 * @name app.route:widgetinstallRoute
 * @description
 * # widgetinstallRoute
 * Route of the app
 */

angular.module('widgetinstall')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.widgetinstall', {
				url:'/widgetinstall',
				templateUrl: 'app/modules/widgetinstall/widgetinstall.html',
				controller: 'WidgetinstallCtrl',
				controllerAs: 'vm'
			});

		
	}]);
