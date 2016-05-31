/*!
* gsConcierge - v0.2.5 - MIT LICENSE 2016-05-31. 
* @author Emotiv
*/
(function() {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main modules of the application.
	 */

	angular.module('gsConcierge', [
		'ngResource',
		'ngAria',
		'ngMaterial',
		'ngMdIcons',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ngStamplay',
		'ngMessages',
		'angular-embedly', //Switch to embedlyServiceProvider within app before removing. Needed to setKey.
		'md-steppers',
		'ui.router',
		'home',
		'create',
		'usersync',
		'embedly',
		'bitly',
		'filestack',
		'ngclipboard'
	]);

})();

(function() {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('gsConcierge')
		.config(configure)
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider', '$mdIconProvider', 'embedlyServiceProvider', 'BitlyServiceProvider', 'filepickerProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider, $mdIconProvider, embedlyServiceProvider, BitlyServiceProvider, filepickerProvider) {

		$mdThemingProvider
			.theme('default')
			.primaryPalette('light-blue', {
				'default': '900'
			})
			.accentPalette('blue-grey', {
				'default': '900'
			})
			.warnPalette('defaultPrimary');

		$mdThemingProvider.theme('dark', 'default')
			.primaryPalette('defaultPrimary')
			.dark();

		$mdThemingProvider.theme('grey', 'default')
			.primaryPalette('grey');

		$mdThemingProvider.theme('custom', 'default')
			.primaryPalette('defaultPrimary', {
				'hue-1': '50'
			});

		$mdThemingProvider.definePalette('defaultPrimary', {
			'50': '#FFFFFF',
			'100': 'rgb(255, 198, 197)',
			'200': '#E75753',
			'300': '#E75753',
			'400': '#E75753',
			'500': '#E75753',
			'600': '#E75753',
			'700': '#E75753',
			'800': '#E75753',
			'900': '#E75753',
			'A100': '#E75753',
			'A200': '#E75753',
			'A400': '#E75753',
			'A700': '#E75753'
		});

		$mdIconProvider.icon('user', 'assets/images/user.svg', 64);

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


		$urlRouterProvider
			.otherwise('/create');

		// Service configurations
		embedlyServiceProvider.setKey('a46a33d99bc642b4aab1dfa58dc11f32');
		
		BitlyServiceProvider.cfgBitly({
			login: 'giftstarter',
			api: 'R_85bf9d10211f4423b5c3be4a336ad77d',
			domain: 'https://api-ssl.bitly.com',
			version: '3'
		});
		
    	filepickerProvider.setKey('AVdh2bvkuTYKQI3rdMsZXz');

	}

	runBlock.$inject = ['$rootScope', '$window'];

	function runBlock($rootScope, $window) {
		'use strict';

		$rootScope.$on('$stateChangeStart',
	    function(event, toState, toParams, fromState, fromParams) {
	      window.Intercom("shutdown"); // only show this on /reate route for now. can also change this to window.Intercom("update")
	      if (toState.external) {
	        event.preventDefault();
	        $window.open(toState.url, '_self');
	      }
	    });
	}


})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:bitlyModule
	 * @description
	 * # bitlyModule
	 * Module of the app
	 */

	angular.module('bitly', []);

})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:createModule
	 * @description
	 * # createModule
	 * Module of the app
	 */

	angular.module('create', []);

})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:embedlyModule
	 * @description
	 * # embedlyModule
	 * Module of the app
	 */

	angular.module('embedly', []);

})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:filestackModule
	 * @description
	 * # filestackModule
	 * Module of the app
	 */

	angular.module('filestack',[]);
	
	window.filepicker = window.filepicker || {};
	window.filepicker.plugin = 'angular_js_lib';
	
	angular.module('filestack')
	.directive('filepicker', filepickerDirective);
	
	filepickerDirective.$inject = ['$rootScope', 'filepickerService', '$parse'];
	function filepickerDirective($rootScope, filepickerService, $parse){
	    return {
	        restrict: 'A',
	        scope:{
	            onSuccess:'&'
	        },
	        link: function(scope, element, attrs) {
	            var key, value;
	            /*
	                pass original event
	            */
	            element.bind('change', function(event) {
	                event.preventDefault();
	                scope.onSuccess({event: event.originalEvent || event});
	                $rootScope.$apply();
	            });
	
	            element = element.length ? element[0] : element;
	
	            for (key in attrs.$attr){
	                value = attrs.$attr[key];
	                element.setAttribute(value, attrs[key]);
	            }
	
	            filepickerService.constructWidget(element);
	        }
	    };
	}
	

	angular.module('filestack')
	.provider('filepicker', function() {
	
	    this.$get = function(){
	        return window.filepicker;
	     };
	
	    this.setKey = function(key) {
	        try {
	            window.filepicker.setKey(key);
	        } catch(err) {
	            console.error('Include filepicker.js script');
	        }
	    };
	});
	
	filepickerService.$inject = ['$window'];
	angular.module('filestack')
	.service('filepickerService',filepickerService);
	
	function filepickerService($window){
	    return $window.filepicker;
	}
	

	filepickerPreviewDirective.$inject = ['$rootScope', 'filepickerService'];
	angular.module('filestack')
	.directive('filepickerPreview', filepickerPreviewDirective);
	
	function filepickerPreviewDirective($rootScope, filepickerService){
	
		return {
	        restrict: 'A',
	        scope:{
	            url: '=',
	        },
	        link: function(scope, element, attrs) {
	            var url = scope.url;
	
	            var iframe = document.createElement('iframe');
	            iframe.src = url;
	
	            /* Set full size so it gets size from parrent element  */
	
	            iframe.width = '100%';
	            iframe.height = '100%';
	            angular.element(element).append(iframe);
	
	            scope.$watch('url', setUrl);
	
	            function setUrl(url){
	                if (!url) {    
	                    return; 
	                } else {
	                    url = url.replace('api/file/', 'api/preview/');
	                }
	                iframe.src = url;
	            }
	        }
	    };
	}
	
	

	angular.module('filestack')
	.service('fpUtilService', fpUtilService);
	
	function fpUtilService(){
	    return {
	        toParams: toParams,
	        serialize: serialize
	    };
	
	    function toParams(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            if (!obj.hasOwnProperty(prop)) {
	                continue;
	            }
	            if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
	                pairs.push(serialize(obj[prop]));
	                continue;
	            }
	            pairs.push(prop + '=' + obj[prop]);
	        }
	        return pairs.join('&');
	    }
	
	    // passed data  converted to a URL-encoded string
	    function serialize(obj) {
	        var str = [];
	        for(var p in obj) {
	            if (obj.hasOwnProperty(p)) {
	                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
	            }
	        }
	        return str.join('&');
	    }
	}
	

	filepickerPreviewDirective.$inject = ['$filter', 'fpUtilService'];
	angular.module('filestack')
	.filter('fpConvert', fpConvert);
	
	function fpConvert($filter, fpUtilService){
	    return function (value, convertOptions) {
	        var originalUrl = $filter('fpUrlFilter')(value);
	        if (!originalUrl || !convertOptions){
	            return;
	        }
	        return originalUrl + '/convert?' + fpUtilService.toParams(convertOptions);
	    };
	}
	angular.module('filestack')
	.filter('fpUrlFilter', function(){
	    return function(input){
	        if (!input){
	            return '';
	        }
	        var endpoints = ['/convert', '/metadata', '?'];
	        for (var i in endpoints) {
	            var index = input.indexOf(endpoints[i]);
	            if (index > -1) {
	                return input.substr(0, index);
	            }
	        }
	        return input;
	    };
	});
	


})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.module:homeModule
	* @description
	* # homeModule
	* Module of the app
	*/

	angular.module('home', []);
})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:usersyncModule
	 * @description
	 * # usersyncModule
	 * Module of the app
	 */

	angular.module('usersync', []);

})();

'use strict';

/**
 * @ngdoc function
 * @name app.route:createRoute
 * @description
 * # createRoute
 * Route of the app
 */

angular.module('create')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.create', {
				url:'/create',
				templateUrl: 'app/modules/create/create.html',
				controller: 'CreateCtrl',
				controllerAs: 'vm'
			});

		
	}]);

'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('gsConcierge')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
		
			.state('home', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('home.dashboard', {
				url:'/dashboard',
				templateUrl: 'app/modules/home/dashboard.html'
			})
			.state('home.syncusers', {
				url:'/sync-users',
				templateUrl: 'app/modules/usersync/usersync.html'
			})
			.state('home.external', {
				url: 'https://giftstarter.com',
				external: true
			});
			
	}]);

'use strict';

/**
 * @ngdoc function
 * @name app.route:usersyncRoute
 * @description
 * # usersyncRoute
 * Route of the app
 */

angular.module('usersync')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.usersync', {
				url:'/usersync',
				templateUrl: 'app/modules/usersync/usersync.html',
				controller: 'UsersyncCtrl',
				controllerAs: 'vm'
			});

		
	}]);

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:bitlyCtrl
	* @description
	* # bitlyCtrl
	* Controller of the app
	*/

	angular
		.module('bitly')
		.controller('BitlyCtrl', Bitly);

		Bitly.$inject = ['bitly', '$rootScope', '$scope'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Bitly(bitly, embedly, $scope) {
			/*jshint validthis: true */
			var vm = this;
			
			$scope.createBitly = function() {
				bitly.getShortUrl(embedly.UrlToBitlify).then(function(data){
					console.log("bit.ly DATA:", data);
					vm.bitlyUrl = data;
					$scope.bitlyUrl = data;
					console.log("Bit.ly", $scope.bitlyUrl);
				}, function(e){
					console.log("Bit.ly ERROR: ", e);
					vm.bitlyUrl = e;
					$scope.bitlyUrl = e;
				});
			};

		}

})();

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

		Create.$inject = ['$scope', '$q', '$mdToast', '$mdDialog', '$window', 'BitlyService', 'filepicker', '$filter', 'CreateService'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $q, $mdToast, $mdDialog, $window, BitlyService, filepicker, $filter, CreateService) {
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

				if (stepData.step === 1) { // stepper is going from step 1 to step 2
					vm.showBusyText = false;
					stepData.completed = true;
					vm.enableNextStep();
					$scope.$broadcast('secondstep');
				} else if (stepData.step === 2) { // stepper is going from step 2 to step 3
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

				$scope.setUploadedImage = function (fpfile) {
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
(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:embedlyCtrl
	* @description
	* # embedlyCtrl
	* Controller of the app
	*/

	angular
		.module('embedly')
		.controller('EmbedlyCtrl', Embedly);

		Embedly.$inject = ['$scope'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Embedly($scope) {
			/*jshint validthis: true */
			var vm = this;
			$scope.embedCode = '';
		}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('gsConcierge')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService', '$scope'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService, $scope) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "Welcome";
		vm.version = "1.0";
		vm.listFeatures = homeService.getFeaturesList();
		
		$scope.user = {
	      title: 'Developer',
	      email: 'ipsum@giftstarter.com',
	      firstName: '',
	      lastName: '',
	      company: 'GiftStarter',
	      address: '100 over there',
	      city: 'Seattle',
	      state: 'WA',
	      biography: 'Just another profile of a bot',
	      postalCode: '98118'
	    };
	    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
	    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
	    'WY').split(' ').map(function(state) {
			return {abbrev: state};
	    });

	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:LayoutCtrl
	* @description
	* # LayoutCtrl
	* Controller of the app
	*/

	angular
		.module('gsConcierge')
		.controller('LayoutCtrl', Layout);

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog ) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.changePassword = function () {
			$mdToast.show(
				$mdToast.simple()
				.content('Password clicked!')
				.position('top right')
				.hideDelay(2000)
			);
		};

		vm.changeProfile = function (ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'tabDialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				$mdToast.show(
					$mdToast.simple()
					.content('You said the information was "' + answer + '".')
					.position('top right')
					.hideDelay(2000)
				);

			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('You cancelled the dialog.')
					.position('top right')
					.hideDelay(2000)
				);
			});

			function DialogController($scope, $mdDialog) {
				$scope.hide = function() {
					$mdDialog.hide();
				};

				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};
			}
		};


		vm.logOut = function () {

			alert('Implement your Function Here');
			// $cookies.put('dev_appserver_login', ' ');
			//$state.go('out', {}, {reload: true});

		};

		var originatorEv;
		vm.openMenu = function ($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:SidenavCtrl
	* @description
	* # SidenavCtrl
	* Controller of the app
	*/
	angular
		.module('gsConcierge')
		.controller('SidenavCtrl', SidenavCtrl)
		.controller('SettingsCtrl', SettingsCtrl);

	// Injecting Denpendencies

	SidenavCtrl.$inject = ['$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', 'MenuService', '$scope', '$window'];
	SettingsCtrl.$inject = ['$mdBottomSheet'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function SidenavCtrl($mdSidenav, $state, $mdBottomSheet, $mdToast, MenuService, $scope, $window) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.closeSidenav = function() {
			$mdSidenav('left').close();
		};

		// Close menu on small screen after click on menu item.
		// Only use $scope in controllerAs when necessary; for example, publishing and subscribing events using $emit, $broadcast, $on or $watch.
		$scope.$on('$stateChangeSuccess', vm.closeSidenav);

		vm.menu = MenuService.listMenu();

		vm.admin = [
			// {
			// 	link: 'home.dashboard',
			// 	title: 'Dashboard',
			// 	icon: 'dashboard'
			// },
			{
				link: 'home.external',
				title: 'GiftStarter.com',
				icon: 'redeem'
			}
		];

		vm.navigateTo = function (link, target) {
				var page = link;	
				$state.go(page);
		};

		vm.showSettingsBottom = function ($event) {
			vm.alert = '';
			$mdBottomSheet.show({
				template: '<md-bottom-sheet class="md-grid" layout="column" ng-cloak><div layout="row" layout-align="center center"><h4>With clickOutsideToClose option, drag down or press ESC to close</h4></div><md-list flex layout="row" layout-align="center center"><md-list-item ng-repeat="item in vm.items"><md-button class="md-grid-item-content" ng-click="vm.listItemClick($index)"><md-icon class="md-48">{{item.icon}}</md-icon><div class="md-grid-text"> {{ item.name }} </div></md-button></md-list-item></md-list></md-bottom-sheet>',
				controller: 'SettingsCtrl',
				controllerAs: 'vm',
				targetEvent: $event
			}).then(function (clickedItem) {
				$mdToast.show(
					$mdToast.simple()
					.content(clickedItem.name + ' clicked!')
					.position('top right')
					.hideDelay(2000)
				);
			});
		};

	}

	function SettingsCtrl($mdBottomSheet) {
		/*jshint validthis: true */
		var vm = this;

		vm.items = [
			{name: 'Roles', icon: 'assignment_ind'},
			{name: 'Notes', icon: 'speaker_notes'},
			{name: 'Tasks', icon: 'view_list'},
			{name: 'Inbox', icon: 'inbox'}
		];

		vm.listItemClick = function ($index) {
			var clickedItem = vm.items[$index];
			$mdBottomSheet.hide(clickedItem);
		};
	}

})();

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
		.module('gsConcierge')
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

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:usersyncCtrl
	* @description
	* # usersyncCtrl
	* Controller of the app
	*/

	angular
		.module('usersync')
		.controller('UsersyncCtrl', Usersync);

		Usersync.$inject = ['$scope', '$http', 'UsersyncService'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Usersync($scope, $http, UsersyncService) {
			/*jshint validthis: true */
			var vm = this;
			
			$scope.users = [];
		    UsersyncService.getUsers();
		    $scope.users = UsersyncService.users;
		    vm.users = $scope.users;

		}

})();

(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:bitlyService
	 * @description
	 * # bitlyService
	 * Service of the app
	 */

	angular
		.module('bitly')
		//.factory('BitlyService', Bitly);
		.provider('BitlyService', Bitly);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Bitly.$inject = [];

		function Bitly () {
			var config;
			return {

				cfgBitly: function(cfg){
					config = cfg;
					config.version = cfg.version || '3'; 
					config.domain = cfg.domain || 'http://api.bit.ly'; // api-ssl.bitly.com
					config.format = cfg.format || 'json';
				},

				$get: ['$http', '$q', '$window', function($http, $q, $window){

					return {

						// API info: http://dev.bitly.com/formats.html
						getShortUrl: function(url){
							var deferredRequest = $q.defer();
							var urlEncoded = encodeURIComponent(url);

							var urlPath = '/v3/shorten';
							var bitlyQuery = '?callback=JSON_CALLBACK&login='+config.login+'&apiKey='+config.api+'&format='+config.format+'&longUrl='+urlEncoded;
							var okPath = "status_code";
							var okCode = 200;

							if(/^2/.test(config.version)){
								urlPath = '/shorten';
								bitlyQuery = '?callback=JSON_CALLBACK&version='+config.version+'&login='+config.login+'&apiKey='+config.api+'&format='+config.format+'&longUrl='+urlEncoded;
								okPath = "errorCode";
								okCode = 0;
							}
							// start jsonp callbacks hack
							/*
							Problem: http://www.pixeldock.com/blog/working-with-jsonp-in-angularjs/
							Hack: http://stackoverflow.com/questions/16560843/json-callback-not-found-using-jsonp
							Discussion: https://github.com/angular/angular.js/issues/1551
							*/
							var c = $window.angular.callbacks.counter.toString(36);
							$window['angularcallbacks_' + c] = function(data) {
								$window.angular.callbacks['_' + c](data);
								delete $window['angularcallbacks_' + c];
							};
							// end hack

							var bitlyUrl = config.domain + urlPath + bitlyQuery;
							$http.jsonp(bitlyUrl)
								.success(function(response){
									if(response && response[okPath] === okCode){
										//console.log("bitly getShortUrl v"+config.version+" OK: ", response);
										if(/^3/.test(config.version)){
											deferredRequest.resolve(response.data.url);
										}else{
											deferredRequest.resolve(response.results[url].shortUrl);
										}
									}else{
										console.info("bitly getShortUrl v"+config.version+" OK with error: ", response);
										deferredRequest.reject(url);
									}
								}).error(function(error){
									console.error("bitly getShortUrl KO: ", error);
									deferredRequest.reject(url);
								});
							return deferredRequest.promise;
						}
					};
				}]
			};
		}

})();

'use strict';
(function() {

	/**
	 * @ngdoc function
	 * @name app.service:createService
	 * @description
	 * # createService
	 * Service of the app
	 */

	angular
		.module('create')
		.factory('CreateService', Create)
		.service('CreateDataService', Data);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Create.$inject = ['$http', 'EmbedlyService'];
		Data.$inject = ['$rootScope'];

		function Create ($http, EmbedlyService) {
			function getEmbedlyRes (url) {
				return EmbedlyService.extract(url, 'a46a33d99bc642b4aab1dfa58dc11f32');
			}
			return {
				getEmbedlyRes: getEmbedlyRes
			};
			
		}
		
		function Data ($rootScope) {
			var vm = this;
			vm.cardImage = '';
			if (!$rootScope.cardImage) {
				$rootScope.cardImage = vm.cardImage;
			}
		}

})();

'use strict';
(function() {

	/**
	 * @ngdoc function
	 * @name app.service:embedlyService
	 * @description
	 * # embedlyService
	 * Service of the app
	 */

	angular
		.module('embedly')
		.service('EmbedlyService', Embedly);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Embedly.$inject = ['$http'];

		function Embedly($http) {

			var key;
			var secure;
			this.setKey = function (userKey) {
				key = userKey;
				return key;
			};
			this.getKey = function () {
				return key;
			};
			this.secure = function (value) {
				if (!value) {
					return secure;
				}
				secure = value;
			};

			function getProtocol() {
				return secure ? 'https' : 'https';
			}

			function embedly($http) {
				/*jshint validthis: true */
				this.embed = function (inputUrl, maxwidth, scheme) {
					var escapedUrl = encodeURIComponent(inputUrl);
					var embedlyRequest = getProtocol() + '://api.embedly.com/1/oembed?key=' + key + '&url=' + escapedUrl;

					if (typeof maxwidth !== 'undefined') {
						embedlyRequest = embedlyRequest + '&maxwidth=' + maxwidth;
					}

					if (typeof scheme !== 'undefined') {
						embedlyRequest = embedlyRequest + '&scheme=' + scheme;
					}

					return $http({
						method: 'GET',
						url: embedlyRequest
					});
				};
			}

			/*jshint validthis: true */
			this.extract = function (inputUrl, key) {
				var escapedUrl = encodeURIComponent(inputUrl);
				var embedlyRequest = getProtocol() + '://api.embedly.com/1/extract?key=' + key + '&url=' + escapedUrl;
				return $http({
					method: 'GET',
					url: embedlyRequest
				});
			};

			this.$get = ['$http', function ($http) {
				return new embedly($http);
			}];

		}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:homeService
	* @description
	* # homeService
	* Service of the app
	*/

	angular.module('gsConcierge')
		.factory('homeService', homeService);

	homeService.$inject = ['$http'];

	function homeService($http) {

		var list = [
			{"feature": "Implemented Best Practices, following: John Papa's Guide"},
			{"feature": "Using Controller AS syntax"},
			{"feature": "Wrap Angular components in an Immediately Invoked Function Expression (IIFE)"},
			{"feature": "Declare modules without a variable using the setter syntax"},
			{"feature": "Using named functions"},
			{"feature": "Including Unit test with Karma"},
			{"feature": "Including UI options for Bootstrap or Angular-Material"},
			{"feature": "Including Angular-Material-Icons for Angular-Material UI"},
			{"feature": "Dynamic Menu generator for both themes"},
			{"feature": "Grunt task for Production and Development"}
		];

		return {
			getFeaturesList: getFeaturesList
		};

		function getFeaturesList() {
			return list;
		}

	}

})();

(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

	angular
		.module('gsConcierge')
		.factory('MenuService', Menu);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Menu.$inject = ['$http'];

		function Menu ($http) {

			var menu = [
				
					{
						link: 'create',
							name: 'Campaign setup',
							icon: 'create'
					},
			    
			];

			return {
				listMenu: function () {
					return menu;
				}
			};

		}

})();

(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

	angular
		.module('gsConcierge')
		.factory('MenuService', Menu);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Menu.$inject = ['$http'];

		function Menu ($http) {

			var menu = [
				
					{
						link: 'create',
						name: 'Non profit campaign',
						icon: 'open_in_browser',
						hide: false
					},

			    
			];

			return {
				listMenu: function () {
					return menu;
				}
			};

		}

})();

(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:usersyncService
	 * @description
	 * # usersyncService
	 * Service of the app
	 */

	angular
		.module('usersync')
		.factory('UsersyncService', Usersync);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Usersync.$inject = ['$http', '$scope'];

		function Usersync ($http, $scope) {
			var vm = this;
			$scope.users = [];
			vm.getUsers = function ($index) {
				$http.get('users.json').success(function(data) {
					vm.users = data;
				});
			};

		}

})();

(function() {
	'use strict';
    angular
        .module('create')
        .directive('bindEmbedly', bindEmbedly);

    function bindEmbedly() {
        var directive = {
            restrict: 'A',
            scope : true,
            link: linkBindEmbedly
        };

        return directive;

        function linkBindEmbedly(scope, elem) {

            var params = {
                cardTitleTextSelector: 'embedly md-card-title md-card-title-text',
                cardTitleHtml: '<md-card-title><md-card-title-text>Add title</md-card-title-text></md-card-title>',
                cardImage: '<img class="md-card-image" ng-src="http://placehold.it/350x150" src="http://placehold.it/350x150" /> ',
                cardImageSelector: 'embedly .md-card-image.update',
                embedlyImagesSelector: '.embedly-variation-images',
                embedlySelector: 'embedly',
                causeImgSelector: '.cause-img',
                causeTitleSelector: '.cause-title'
            };

            var mdCardTitleVal,
                causeImg,
                embedly,
                embedlyImages,
                causeTitle,
                mdCardImgs;
            scope.$on('secondstep', function () {
                scope.cardImg = scope.$parent.cardImg;
                scope.cardTitle = scope.$parent.cardTitle;
                causeTitle = elem.find(params.causeTitleSelector);
                causeImg = elem.find(params.causeImgSelector);
                embedly = angular.element(document.querySelectorAll(params.embedlySelector)[0]);
                embedlyImages = angular.element(document.querySelectorAll(params.embedlyImagesSelector));
                mdCardTitleVal = angular.element(document.querySelectorAll(params.cardTitleTextSelector)[1]);
                mdCardImgs = document.querySelectorAll(params.cardImageSelector);
                
                function clickEmbedlyImageHandler() {
                    scope.$parent.cardImg = event.currentTarget.src;
                    updateCardImg(event.currentTarget.src, 'animated fadeIn');
                    console.log(event.currentTarget.src);
                }

                function addHandlersForImages(images) {
                    images.addEventListener('click', clickEmbedlyImageHandler);
                }

                angular.forEach(embedlyImages, addHandlersForImages);

                function cardTitleWatch (newValue) {
                    if (newValue) {
                        mdCardTitleVal.text(newValue);
                        scope.$parent.cardTitle = scope.cardTitle;
                    }
                }

                function twoWayTitle () {
                    scope.$watch('cardTitle', cardTitleWatch);
                }

                function watchImageChange (newValue) {
                    if (newValue) {
                        scope.$parent.cardImg = newValue.trim();
                        updateCardImg(newValue.trim(), 'animated fadeIn');
                    }
                }
                
                function updateCardImg (src, className) {
                    angular.forEach(mdCardImgs, function(value, key) {
                        mdCardImgs[key].src = src;
                        mdCardImgs[key].class = className;
                    });
                }

                function twoWayImg () {
                    scope.cardImg = mdCardImgs[0].src.toString().trim();
                    scope.$parent.cardImg = mdCardImgs[0].src.toString().trim();
                    scope.$watch('cardImg', watchImageChange);

                }

                if (mdCardTitleVal) {
                    twoWayTitle();
                } else {
                    embedly.prepend(params.cardTitleHtml);
                    mdCardTitleVal = angular.element(document.querySelectorAll(params.cardTitleTextSelector)[0]);
                    twoWayTitle();
                }
                if (mdCardImgs) {
                    twoWayImg();
                } else {
                    //embedly.prepend(params.cardImage);
                    mdCardImgs = document.querySelectorAll(params.cardImageSelector);
                    twoWayImg();
                }
            });
        }
    }
})();
(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:bitlyDirective
	* @description
	* # bitlyDirective
	* Directive of the app
	*/

	angular
		.module('gsConcierge')
		.directive('bitlyDirective', bitlyDirective);

		function bitlyDirective () {

			var directive = {
				restrict: 'A',
				controller: 'BitlyCtrl',
				scope: true,
				link: link,
				templateUrl:'app/modules/shared/directives/bitly/bitly.html',
				
			};

			return directive;

			function link(bitly, embedly, scope, element, attrs) {
				attrs.$observe('href', function(){
					scope.url = embedly.UrlToBitlify;
					//console.log("directive currentHref", a.href);
					var a = element[0];
					if(a.href){ 
						bitly.getShortUrl(a.href).then(function(data){
							a.href = data;
							//console.log("directive result", a.href);
						});
					}
				});
			}

		}

})();

(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name app.controller:embedlyDirective
     * @description
     * # embedlyDirective
     * Directive of the app
     */

    angular
        .module('gsConcierge')
        .directive('embedly', embedly);
        
    embedly.$inject = ['embedlyService', 'CreateDataService', '$timeout'];

    function embedly(embedlyService, CreateDataService, $timeout) {

        var directive = {
            link: link,
            restrict: 'E',
            controller: 'EmbedlyCtrl',
            scope: {
                urlsearch: '@',
                maxwidth: '@',
                scheme: '@',
                hideimage: '@',
                updateimage: '@',
                onempty: '&'
            },
            templateUrl: '/app/modules/shared/directives/embedly/embedly.html'
        };

        return directive;

        function link(scope, element, attrs) {
            // This function should be called when the oEmbed returns no embed code
            function handleEmpty() {
                if (scope.onempty !== undefined && typeof (scope.onempty) === "function") {
                    scope.onempty();
                }
            }

            scope.$parent.loading_embedly = false;

            scope.$watch('urlsearch', function (newVal) {
                var previousEmbedCode = scope.embedCode;
                if (newVal) {
                    scope.$parent.loading_embedly = true;
                    embedlyService.extract(newVal, scope.maxwidth, scope.scheme)
                        .then(function (data) {
                            if (previousEmbedCode !== data.data) {
                                var fetchSuccess = true;
                                switch (data.data.type) {
                                case 'html':
                                    scope.embedCode = data.data;
                                    // if (CreateDataService.cardImage) {
                                    //     scope.cardImage = CreateDataService.cardImage;
                                    //     console.log('CreateDataService: ' + scope.cardImage);
                                    // } else if (!CreateDataService.cardImage && scope.embedCode.images[0].url){
                                        CreateDataService.cardImage = scope.embedCode.images[0].url;
                                        scope.cardImage = scope.embedCode.images[0].url;
                                        console.log('embedCode.images[0].url: ' + scope.cardImage);
                                    //}
                                    break;
                                case 'video':
                                case 'rich':
                                    if (data.data.html === undefined) {
                                        fetchSuccess = false;
                                    } else {
                                        scope.embedCode = data.data;
                                    }
                                    break;
                                case 'photo':
                                case 'image':
                                    if (data.data.url === undefined) {
                                        fetchSuccess = false;
                                    } else {
                                        scope.embedCode = data.data;
                                    }
                                    break;
                                default:
                                    fetchSuccess = false;
                                    break;
                                }
                                if (!fetchSuccess) {
                                    handleEmpty();
                                    scope.embedCode = '';
                                    scope.$parent.$broadcast('embedly-fetch-error');
                                } else {
                                    scope.$parent.$broadcast('embedly-fetch-success');
                                }
                            }
                        }, function (error) {
                            // promise rejected
                            scope.embedCode = '';
                            scope.$parent.$broadcast('embedly-fetch-error');
                            handleEmpty();
                        }).finally(function() {
                            scope.$parent.loading_embedly = false;
                        });
                }
            });
        }

    }

})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:filestackDirective
	* @description
	* # filestackDirective
	* Directive of the app
	*/

	angular
		.module('gsConcierge')
		.directive('filepickerDirective', filepickerDirective)
		.directive('filepickerPreview', filepickerPreviewDirective)
		.directive('filepickerCustomDirective', filepickerCustomDirective);

	filepickerDirective.$inject = ['$rootScope', 'filepickerService', '$parse'];
	function filepickerDirective($rootScope, filepickerService, $parse){
		    return {
		        restrict: 'A',
		        scope:{
		            onSuccess:'&'
		        },
		        link: function(scope, element, attrs) {
		            var key, value;
		            /*
		                pass original event
		            */
		            element.bind('change', function(event) {
		                event.preventDefault();
		                scope.onSuccess({event: event.originalEvent || event});
		                $rootScope.$apply();
		            });
		
		            element = element.length ? element[0] : element;
		
		            for (key in attrs.$attr){
		                value = attrs.$attr[key];
		                element.setAttribute(value, attrs[key]);
		            }
		
		            filepickerService.constructWidget(element);
		        }
		    };
		}
		
		filepickerPreviewDirective.$inject = ['$rootScope', 'filepickerService'];
		function filepickerPreviewDirective($rootScope, filepickerService){
		
			return {
		        restrict: 'A',
		        scope:{
		            url: '=',
		        },
		        link: function(scope, element, attrs) {
		            var url = scope.url;
		
		            var iframe = document.createElement('iframe');
		            iframe.src = url;
		
		            /* Set full size so it gets size from parrent element  */
		
		            iframe.width = '100%';
		            iframe.height = '100%';
		            angular.element(element).append(iframe);
		
		            scope.$watch('url', setUrl);
		
		            function setUrl(url){
		                if (!url) {    
		                    return; 
		                } else {
		                    url = url.replace('api/file/', 'api/preview/');
		                }
		                iframe.src = url;
		            }
		        }
		    };
		}
		
		filepickerCustomDirective.$inject = ['$rootScope', 'filepickerService'];
		function filepickerCustomDirective($rootScope, filepickerService){

		    return {
		        scope: {
		            options: '=',
		            onSuccess:'&',
		            onError:'&',
		        },
		        template: '<button class="fp__btn" ng-click="openPicker()">Pick</button>',
		        link: function(scope, elm, attrs) {
		            scope.openPicker = openPicker;
		            scope.options = scope.options || {};
		            function openPicker(){
		                filepickerService.pick(
		                    scope.options,
		                    function(Blob){
		                        scope.onSuccess({Blob: Blob});
		                    },
		                    function(Error){
		                        scope.onError({Error: Error});
		                    }
		                );
		            }
		        }
		    };
		
		}
		
		
})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:linkcreatorDirective
	* @description
	* # linkcreatorDirective
	* Directive of the app
	*/

	angular
		.module('gsConcierge')
		.directive('linkCreator', linkCreator);

		function linkCreator () {

			var directive = {
				link: link,
				restrict: 'EA',
				controller: 'LinkCreatorCtrl',
				
				templateUrl:'app/modules/shared/directives/linkcreator/linkcreator.html',
				
			};

			return directive;

			function link(scope, element, attrs) {
				// write your code here
			}

		}

})();
