'use strict';
(function() {

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

		Create.$inject = ['$http', 'EmbedlyService'];

		function Create ($http, EmbedlyService) {
			function getEmbedlyRes (url) {
				return EmbedlyService.extract(url, 'a46a33d99bc642b4aab1dfa58dc11f32');
			}
			return {
				getEmbedlyRes: getEmbedlyRes
			};
		}

})();
