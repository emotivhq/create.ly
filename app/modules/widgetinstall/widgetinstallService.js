(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:widgetinstallService
	 * @description
	 * # widgetinstallService
	 * Service of the app
	 */

  	angular
		.module('widgetinstall')
		.factory('WidgetinstallService', Widgetinstall);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Widgetinstall.$inject = ['$http'];

		function Widgetinstall ($http) {

		}

})();
