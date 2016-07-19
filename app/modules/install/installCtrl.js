(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:installCtrl
	* @description
	* # installCtrl
	* Controller of the app
	*/

  	angular
		.module('install')
		.controller('InstallCtrl', Install);

		Install.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Install() {
			/*jshint validthis: true */
			var vm = this;

		}

})();
