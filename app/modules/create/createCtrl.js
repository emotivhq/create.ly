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

	Create.$inject = ['$scope', '$q', '$mdToast', '$mdDialog', '$window', 'BitlyService', '$httpParamSerializerJQLike', 'filepicker', '$filter', 'CreateService'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Create($scope, $q, $mdToast, $mdDialog, $window, BitlyService, $httpParamSerializerJQLike, filepicker, $filter, CreateService) {
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
		// Setup the initial step data
		vm.stepData = [
			{ step: 1, completed: false, optional: false, data: {product_url: 'https://'}},
			{ step: 2, completed: false, optional: false, data: {title: 'Imagine Saving a Life: Donate Blood Today', price: ''} },
			{ step: 3, completed: false, optional: false, data: {} }
		];

		vm.enableNextStep = function nextStep() {
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
		vm.urlSearch = '';

		vm.getUrlInfo = function getUrlInfo(url) {
			//look at $scope.$on('embedly-fetch-success') or $scope.$on('embedly-fetch-error') for functionality after embedly call.
			CreateService.getEmbedlyRes(url).then(
				function (response) {
					$scope.embedlyImages = response.data.images;
		Create.$inject = ['$scope', '$q', '$timeout', '$mdToast', '$mdDialog', '$window', 'BitlyService', '$httpParamSerializerJQLike', 'filepicker', '$filter'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $q, $timeout, $mdToast, $mdDialog, $window, BitlyService, $httpParamSerializerJQLike, filepicker, $filter) {
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
			vm.cardImg = '';
			$scope.cardImg = '';
			// Setup the initial step data
			vm.stepData = [
				{ step: 1, completed: false, optional: false, data: {product_url: 'https://'}},
				{ step: 2, completed: false, optional: false, data: {title: 'Imagine Saving a Life: Donate Blood Today', price: ''} },
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
			);
			$mdToast.hide();
			vm.urlSearch = url;
		};

		$scope.$on('embedly-fetch-success', function() {
			$scope.showPreview = true;
			//$scope.$digest();
		});

		$scope.$on('embedly-fetch-error', function() {
			$scope.showPreview = false;
		});

		vm.campaignCreateShortLink = '';

		vm.submitCurrentStep = function submitCurrentStep(stepData) {
			vm.showBusyText = true;

			if (stepData.step === 1) { // stepper is going from step 1 to step 2
				//$scope.cardTitle;
				$scope.$broadcast('secondstep');
				vm.showBusyText = false;
				stepData.completed = true;
				vm.enableNextStep();
			} else
			if (stepData.step === 2) { // stepper is going from step 2 to step 3
				//$scope.$broadcast('create-bitly-link');
				var product_url = vm.stepData[0].data.product_url,
				title = vm.stepData[1].data.title, //update once embedly bind is finished.
				price = parseFloat($filter('number')(vm.stepData[1].data.price*100, 2).replace(/,/g, '')),
				img_url = 'http://www.bloodworksnw.org/images/home/5-23-2016-bloodworks-memorial-banner.jpg', //update once filepicker and embedly bind is finished.
				source = 'Bloodworks Northwest', //update once embedly bind is finished. Need to bind "source" from embedly returned data.
				urlToShorten = 'https://www.giftstarter.com/create?product_url=' + product_url + '&title=' + title +'&price=' + price + '&img_url=' + img_url + '&source=' + source;

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
			}
		};

		$scope.setUploadedImage = function (fpfile) {
			$scope.cardImg = fpfile.url;
			vm.cardImg = fpfile.url;
		};

		$scope.campaignCreateShortLink = 'http://bit.ly/1234567890';

		vm.showUrlEducationDialog = function showUrlEducationDialog(ev) {
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

		vm.startCampaignFromLink = function startCampaignFromLink() {
			$window.open(vm.campaignCreateShortLink);
		};

		vm.clearStepper = function clearStepper() {
			$window.location.reload();
		};

		vm.showClipboardTooltip = false;
		vm.showFallbackClipboardTooltip = false;

		vm.clipboardCopySuccess = function clipboardCopySuccess() {
			vm.showClipboardTooltip = true;
			//ev.clearSelection();
		};

		vm.clipboardCopyError = function clipboardCopyError() {
			vm.showFallbackClipboardTooltip = true;
		};
	}
				} else 
				if (stepData.step === 2) { // stepper is going from step 2 to step 3
					console.log(vm.stepData[1].data.cardImg);
					//$scope.$broadcast('create-bitly-link');
					var base_url = 'https://www.giftstarter.com/create?product_url=',
						product_url = vm.stepData[0].data.product_url,
						title = vm.stepData[1].data.title, //update once embedly bind is finished.
						price = parseFloat($filter('number')(vm.stepData[1].data.price*100, 2).replace(/,/g, '')),
						img_url = vm.stepData[1].data.cardImg,
						source = 'Bloodworks Northwest', //update once embedly bind is finished. Need to bind "source" from embedly returned data.
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
				}
			};
			
			$scope.setUploadedImage = function (fpfile) {
				$scope.mdCardImg = fpfile.url;
				$scope.cardImg = fpfile.url;
				vm.cardImg = fpfile.url;
				vm.stepData[1].data.cardImg = fpfile.url;
				console.log(fpfile);
			};
			
			$scope.campaignCreateShortLink = 'http://bit.ly/1234567890';
			
			vm.showUrlEducationDialog = function showUrlEducationDialog(ev) {
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
			
			vm.startCampaignFromLink = function startCampaignFromLink() {
				$window.open(vm.campaignCreateShortLink);
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
