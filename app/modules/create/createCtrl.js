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

		Create.$inject = ['$scope', '$q', '$timeout', '$mdToast', '$mdDialog', '$window', 'BitlyService', '$httpParamSerializerJQLike'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $q, $timeout, $mdToast, $mdDialog, $window, BitlyService, $httpParamSerializerJQLike) {
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
			
			$scope.campaignCreateShortLink = '';
			
			vm.submitCurrentStep = function submitCurrentStep(stepData, isSkip) {
				vm.showBusyText = true;
				
				if (stepData.step === 1) { // stepper is going from step 1 to step 2
					
				} else 
				if (stepData.step === 2) { // stepper is going from step 2 to step 3
					//$scope.$broadcast('create-bitly-link');
					//console.log(vm.stepData);
					var product_url = 'http://www.bloodworksnw.org/home/index.htm',
						title = 'Testing bitly service',
						price = '20.00',
						image = 'http://www.bloodworksnw.org/images/home/5-23-2016-bloodworks-memorial-banner.jpg',
						source = 'Bloodworks Northwest',
						urlToShorten = $httpParamSerializerJQLike('https://www.giftstarter.com/create?\
											url=' + product_url + '\
											&titie=' + title +'\
											&price=' + price + '\
											&image=' + image + '\
											&source=' + source);
						// urlToShorten = 'https://www.giftstarter.com/create?url=' + product_url + '&titie=' + title +'&price=' + price + '&image=' + image + '&source=' + source;
											
					var bitlyPromise = BitlyService.getShortUrl(urlToShorten);
					
					bitlyPromise.then(function (data) {
						console.log('Success: ' + data);
					}, function (reason) {
						console.log('Failed: ' + reason);
					});
					
					$scope.campaignCreateShortLink = '';
					
					//build URL with params: url, title, price, image, source
					//pass to BitlyService.getShortUrl(URL);
				}
				
				if (!stepData.completed && !isSkip) {
					vm.showBusyText = false;
					stepData.completed = true;
					vm.enableNextStep();
				} else {
					vm.showBusyText = false;
					vm.enableNextStep();
				}
			};
			
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
			
			vm.urlSerialize = function urlSerialize (obj) {
				var str = [];
				for (var p in obj)
					if (obj.hasOwnProperty(p)) {
						str.push(encodeURIComponent(p) + "=" +
							encodeURIComponent(obj[p]));
					}
				return str.join("&");
			};
			
			vm.clearStepper = function clearStepper() {
				//reset the entire page here.
				$window.location.reload();
			};
		}

})();
