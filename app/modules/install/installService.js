(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:installService
	 * @description
	 * # installService
	 * Service of the app
	 */

  	angular
		.module('install')
		.factory('InstallService', Install);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Install.$inject = ['$http'];

		function Install ($http) {

		}

})();
