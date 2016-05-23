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

		Create.$inject = ['$scope', '$q', '$timeout', '$mdToast', '$mdDialog', '$window'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $q, $timeout, $mdToast, $mdDialog, $window) {
			/*jshint validthis: true */
			var vm = this;
			window.Intercom("boot", {
			  app_id: "q5i7p4f9"
			});

			$scope.tryAgain = function() {
				$mdToast.show(
					$mdToast.simple()
					.content('We didn\'t find anything for that URL. Please try another one.')
					.position('bottom left')
					.hideDelay(3500)
				);
			};
			
			$scope.product_url = '';
			$scope.productUrlHint = 'http://www.bloodworksnw.org/home/index.htm';
			$scope.showProductUrlHint = true;
			$scope.urlPattern = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i;

			vm.selectedStep = 0;
			vm.stepProgress = 1;
			vm.maxStep = 3;
			vm.showBusyText = false;
			// Setup the initial step data
			vm.stepData = [
				{ step: 1, completed: false, optional: false, data: {product_url: 'https://'}},
				{ step: 2, completed: false, optional: false, data: {title: 'Imagine Saving a Life: Donate Blood Today', price: '20.00'} },
				{ step: 3, completed: false, optional: false, data: {} },
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
			
			$scope.showPreview = false;
			
			$scope.getUrlInfo = function(url) {
				$scope.urlSearch = url;
				$mdToast.hide();
			};
			
			$scope.clearUrlInfo = function() {
				$scope.urlSearch = '';
				$scope.showPreview = false;
			};
			
			$scope.$on('embedly-fetch-success', function() {
				$scope.showPreview = true;
			});
			
			$scope.$on('embedly-fetch-error', function() {
				$scope.showPreview = false;
			});
			
			vm.submitCurrentStep = function submitCurrentStep(stepData, isSkip) {
				vm.showBusyText = true;
				if (!stepData.completed && !isSkip) {
					vm.showBusyText = false;
					stepData.completed = true;
					vm.enableNextStep();
					console.log(stepData);
				} else {
					vm.showBusyText = false;
					vm.enableNextStep();
				}
			};
			$scope.campaignCreateShortLink = 'http://bit.ly/1234567890';
			
			$scope.showUrlEducationDialog = function (ev) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('How this tool works.')
					.ariaLabel('How this tool works.')
					.textContent('This tool does it\'s best to extract content from any url it is given. If the content above looks wonky, first make sure you have the correct url. If you are 100% sure you do, use the next step to customize things to look how you want.')
					.targetEvent(ev)
					.ok('Close')
				);
			};
			
			vm.clearStepper = function clearStepper() {
				//reset the entire page here.
				$window.location.reload();
			};
		}

})();
