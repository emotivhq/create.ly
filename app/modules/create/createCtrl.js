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

		Create.$inject = ['$scope'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope) {
			/*jshint validthis: true */
			var vm = this;
			
			$scope.input_product_url = 'https://';
			$scope.show_product_preview = false;
			$scope.showHints = true;
			
			$scope.showProductPreview = function() {
				$scope.show_product_preview = true;
			};
			
			$scope.hideProductPreview = function() {
				$scope.show_product_preview = false;
			};

		}

})();
