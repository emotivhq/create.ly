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

		Create.$inject = ['$scope', '$q', '$timeout', '$mdToast'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $q, $timeout, $mdToast) {
			/*jshint validthis: true */
			var vm = this;
			window.Intercom("boot", {
			  app_id: "q5i7p4f9"
			});

			$scope.tryAgain = function() {
				$mdToast.show(
					$mdToast.simple()
					.content('Try again, nothing returned')
					.position('bottom right')
					.hideDelay(2000)
				);
			};
			
			$scope.product_url = '';
			$scope.productUrlHint = 'https://giveto.seattlechildrens.org/changealife';
			$scope.showProductUrlHint = true;
			$scope.urlPattern = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i;

			vm.selectedStep = 0;
			vm.stepProgress = 1;
			vm.maxStep = 3;
			vm.showBusyText = false;
			// Setup the initial step data
			vm.stepData = [
				{ step: 1, completed: false, optional: false, data: {
					product_url: 'https://'
				} },
				{ step: 2, completed: false, optional: false, data: {} },
				{ step: 3, completed: false, optional: false, data: {} },
				// { step: 4, completed: false, optional: false, data: {} },
			];
		
			vm.enableNextStep = function nextStep(skip) {
				//do not exceed into max step
				if (vm.selectedStep >= vm.maxStep) {
					return;
				}
				//do not increment vm.stepProgress when submitting from previously completed step
				if (vm.selectedStep === vm.stepProgress - 1) {
					vm.stepProgress = vm.stepProgress + 1;
				}
				vm.selectedStep = vm.selectedStep + 1;
			};
		
			vm.moveToPreviousStep = function moveToPreviousStep() {
				if (vm.selectedStep > 0) {
					vm.selectedStep = vm.selectedStep - 1;
				}
			};
			
			vm.showPreview = false;
			
			$scope.getUrlInfo = function(url) {
				$scope.urlSearch = url;
				$scope.showPreview = true;
			};
			
			$scope.clearUrlInfo = function() {
				$scope.urlSearch = '';
				$scope.showPreview = false;
			};
			
			vm.submitCurrentStep = function submitCurrentStep(stepData, isSkip) {
				var deferred = $q.defer();
				vm.showBusyText = true;
				console.log('On before submit');
				if (!stepData.completed && !isSkip) {
					//simulate $http
					vm.showBusyText = false;
					console.log('Step success, #chaboi style');
					deferred.resolve({
						status: 200,
						statusText: 'success',
						data: {}
					});
					//move to next step when success
					stepData.completed = true;
					vm.enableNextStep();
				} else {
					vm.showBusyText = false;
					vm.enableNextStep();
				}
			};
			$scope.campaignCreateShortLink = 'http://bit.ly/1234567890';

		}

})();
