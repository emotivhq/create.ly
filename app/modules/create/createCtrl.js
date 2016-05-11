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

		Create.$inject = ['$scope', '$mdToast'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $mdToast) {
			/*jshint validthis: true */
			var vm = this;
			
			$scope.input_product_url = 'https://';
			$scope.show_product_preview = false;
			$scope.showHints = true;
			
			$scope.showProductPreview = function() {
				//$scope.show_product_preview = true;
				$scope.showHints = false;
			};
			
			$scope.hideProductPreview = function() {
				$scope.show_product_preview = false;
			};
			
			$scope.tryAgain = function() {
				$mdToast.show(
					$mdToast.simple()
					.content('Tray again, nothing returned')
					.position('bottom right')
					.hideDelay(2000)
				);
			};

		}

})();
