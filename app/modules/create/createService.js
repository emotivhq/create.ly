(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:createService
	 * @description
	 * # createService
	 * Service of the app
	 */

	angular
		.module('create')
		.factory('CreateService', Create);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Create.$inject = ['$http'];

		function Create ($http) {

		}

})();
