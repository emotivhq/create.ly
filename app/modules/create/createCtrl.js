(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:createCtrl
	* @description
	* # createCtrl
	* Controller of the app
	*/

  	angular
		.module('create')
		.controller('CreateCtrl', Create);

		Create.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create() {
			/*jshint validthis: true */
			var vm = this;

		}

})();
