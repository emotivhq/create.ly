(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:linkcreatorCtrl
	* @description
	* # linkcreatorCtrl
	* Controller of the app
	*/

	angular
		.module('create-ly')
		.controller('LinkCreatorCtrl', LinkCreator );

		LinkCreator.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function LinkCreator() {
			/*jshint validthis: true */
			var vm = this;

		}

})();
