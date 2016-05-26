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

		Create.$inject = ['$scope', '$q', '$mdToast', '$mdDialog', '$window', 'BitlyService', 'filepicker', '$filter', 'CreateService', 'CreateDataService'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $q, $mdToast, $mdDialog, $window, BitlyService, filepicker, $filter, CreateService, CreateDataService) {
			/*jshint validthis: true */
			var vm = this;
			window.Intercom("boot", {
			  app_id: "q5i7p4f9"
			});
			// Filestack JS API
			//var element = document.getElementById('filestack-widget');
			//filepicker.constructWidget(element);

			$scope.tryAgain = function() {
				$mdToast.show(
					$mdToast.simple()
					.content('We didn\'t find anything for that URL. Please try another one.')
					.position('bottom left')
					.hideDelay(3500)
				);
			};

			vm.productUrlHint = 'http://www.bloodworksnw.org/home/index.htm';
			vm.showProductUrlHint = true;
			vm.urlPattern = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i;
			vm.selectedStep = 0;
			vm.stepProgress = 1;
			vm.maxStep = 3;
			vm.showBusyText = false;
			vm.cardImg = CreateDataService.cardImage;
			$scope.cardImg = CreateDataService.cardImage;
			// Setup the initial step data
			vm.stepData = [
				{ step: 1, completed: false, optional: false, data: {product_url: 'https://'}},
				{ step: 2, completed: false, optional: false, data: {title: '', price: ''} },
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

			$scope.cardTitle = '';
			$scope.originalUrl = '';
			$scope.providerName = '';
			$scope.faviconUrl = '';
			$scope.providerDisplay = '';
			$scope.cardDescription = '';
			vm.urlSearch = '';
			
			vm.getUrlInfo = function getUrlInfo(url) {
				CreateService.getEmbedlyRes(url).then(
					function (response) {
						if (response) {
							$scope.cardTitle  = response.data.title;
							$scope.embedlyImages = response.data.images;
							$scope.originalUrl = response.data.original_url;
							$scope.providerName = response.data.provider_name;
							$scope.faviconUrl = response.data.favicon_url;
							$scope.providerDisplay = response.data.provider_display;
							$scope.cardDescription = response.data.description;
						}
					}, function(error) {
						console.log('Failed request to embedly ' + error);
					}
				);
				$mdToast.hide();
				vm.urlSearch = url;
				//look at $scope.$on('embedly-fetch-success') or $scope.$on('embedly-fetch-error') for functionality after embedly call.
			};

			$scope.showPreview = false;
			$scope.$on('embedly-fetch-success', function() {
				$scope.showPreview = true;
				console.log('embedly-fetch-success');
				//$scope.$digest();
			});

			$scope.$on('embedly-fetch-error', function() {
				$scope.showPreview = false;
				console.log('embedly-fetch-failure');
			});

			vm.campaignCreateShortLink = '';
			
			vm.submitCurrentStep = function submitCurrentStep(stepData) {
				vm.showBusyText = true;

				if (stepData.step === 0) { // stepper is going from step 0 to step 1
					$scope.$broadcast('bindEmbedlyNow', $scope.cardImg);
					console.log('bindEmbedlyNow - 0' + $scope.cardImg);
				} else if (stepData.step === 1) { // stepper is going from step 1 to step 2
					vm.showBusyText = false;
					stepData.completed = true;
					vm.enableNextStep();
					$scope.$broadcast('bindEmbedlyNow', $scope.cardImg);
					console.log('bindEmbedlyNow - 1' + $scope.cardImg);
				} else if (stepData.step === 2) { // stepper is going from step 2 to step 3
					$scope.$broadcast('bindEmbedlyNow', $scope.cardImg);
					console.log('bindEmbedlyNow - 2' + $scope.cardImg);
					if (vm.stepData[1].data.price) {
						//$scope.$broadcast('create-bitly-link');
						var base_url = 'https://www.giftstarter.com/create?product_url=',
							product_url = $scope.originalUrl,
							title = $scope.cardTitle, //update once embedly bind is finished.
							price = parseFloat($filter('number')(vm.stepData[1].data.price*100, 2).replace(/,/g, '')),
							img_url = $scope.cardImg,
							source = $scope.providerName, //update once embedly bind is finished. Need to bind "source" from embedly returned data.
							urlToShorten = base_url + product_url + '&title=' + title +'&price=' + price + '&img_url=' + img_url + '&source=' + source;

						var bitlyPromise = BitlyService.getShortUrl(urlToShorten);
						bitlyPromise.then(function (data) {
							vm.campaignCreateShortLink = data;
							vm.showBusyText = false;
							stepData.completed = true;
							vm.showClipboardTooltip = false;
							vm.showFallbackClipboardTooltip = false;
							vm.enableNextStep();
						}, function (reason) {
								console.log('Failed: ' + reason);
								vm.campaignCreateShortLink = '';
								vm.showBusyText = false;
								stepData.completed = false;
								$mdToast.show(
									$mdToast.simple()
									.content('There was an issue creating your custom campaign link. Please try again.')
									.position('bottom left')
									.hideDelay(3500)
								);
							});
					} else {
			            vm.showBusyText = true;
			            stepData.completed = false;
					}
				}
			};

			vm.startCampaignFromLink = function startCampaignFromLink() {
				$window.open(vm.campaignCreateShortLink);
			};
			
			$scope.$on('bindEmbedlyNow', function (data) {
				CreateDataService.cardImage = data;
				$scope.mdCardImg = data;
				$scope.cardImg = data;
			});

			$scope.setUploadedImage = function (fpfile) {
				CreateDataService.cardImage = fpfile.url;
				$scope.mdCardImg = fpfile.url;
				$scope.cardImg = fpfile.url;
				vm.cardImg = fpfile.url;
				vm.stepData[1].data.cardImg = fpfile.url;
				console.log(fpfile);
			};

			vm.showUrlEducationDialog = function showUrlEducationDialog(ev) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('How this tool works.')
					.ariaLabel('How this tool works.')
					.textContent('This tool does it\'s best to extract content from any url it is given. If the content above looks wonky, first make sure you have the correct url. If you are 100% sure you do, use the next step to customize things to look how you want.')
					.targetEvent(ev)
					.ok('Got it')
				);
			};

			vm.clearStepper = function clearStepper() {
				$window.location.reload();
			};

			vm.showClipboardTooltip = false;
			vm.showFallbackClipboardTooltip = false;

			vm.clipboardCopySuccess = function clipboardCopySuccess(ev) {
				vm.showClipboardTooltip = true;
				//ev.clearSelection();
			};

			vm.clipboardCopyError = function clipboardCopyError(ev) {
				vm.showFallbackClipboardTooltip = true;
			};
		}
})();
