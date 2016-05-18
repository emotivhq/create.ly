(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:embedlyCtrl
	* @description
	* # embedlyCtrl
	* Controller of the app
	*/

	angular
		.module('embedly')
		.controller('EmbedlyCtrl', Embedly);

		Embedly.$inject = ['$scope'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Embedly($scope) {
			/*jshint validthis: true */
			var vm = this;
			$scope.embedCode = '';

		}

})();
