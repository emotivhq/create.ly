/*!
* gsConcierge - v0.0.1 - MIT LICENSE 2016-05-24. 
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
		'angular-filepicker', //Switch to filepickerServiceProvider within app before removing. Needed to setKey.
		'md-steppers',
		'ui.router',
		'home',
		'create',
		'usersync',
		'embedly',
		'bitly',
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

		Create.$inject = ['$scope', '$q', '$timeout', '$mdToast', '$mdDialog', 'filepicker'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $q, $timeout, $mdToast, $mdDialog, filepicker) {
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
					.content('Try again, nothing returned')
					.position('bottom right')
					.hideDelay(2000)
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
				{ step: 2, completed: false, optional: false, data: {title: 'Imagine Saving a Life: Donate Blood Today', price: '250.00'} },
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
				console.log(stepData);
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
			
			$scope.showUrlEducationDialog = function (ev) {
				var confirm = $mdDialog.confirm()
					.clickOutsideToClose(true)
					.title('How this tool works.')
					.textContent('This tool uses a method of extracting content from any link it is given. If the content above looks wonky, first make sure you have the correct link. If you are 100% sure you do, use the next step to customize the content to look exactly like you want it to.')
					.ariaLabel('How this tool works')
					.targetEvent(ev)
					.ok('This link is correct. Let\'s customize the content.')
					.cancel('Let\'s double check the link.');
				$mdDialog.show(confirm).then(function () {
					//TODO: move to next step two
					//vm.submitCurrentStep(vm.stepData[0]); <--- this doesn't work...
				}, function () {
					//do nothing because they closed the modal.	
				});
				
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

	SidenavCtrl.$inject = ['$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', 'MenuService', '$scope'];
	SettingsCtrl.$inject = ['$mdBottomSheet'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function SidenavCtrl($mdSidenav, $state, $mdBottomSheet, $mdToast, MenuService, $scope) {
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
			{
				link: 'home.dashboard',
				title: 'Dashboard',
				icon: 'dashboard'
			},
			{
				link: 'home.external',
				title: 'GiftStarter.com',
				icon: 'redeem'
			}
		];

		vm.navigateTo = function (target) {

			var page = target;

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
										//console.info("bitly getShortUrl v"+config.version+" OK with error: ", response);
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

(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:createService
	 * @description
	 * # createService
	 * Service of the app
	 */

	angular
		.module('create')
		.factory('CreateService', Create);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Create.$inject = ['$http'];

		function Create ($http) {

		}

})();

(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:embedlyService
	 * @description
	 * # embedlyService
	 * Service of the app
	 */

    angular
		.module('embedly')
		.factory('EmbedlyService', Embedly);
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
		        /*jshint validthis: true */
		        this.extract = function (inputUrl) {
		            var escapedUrl = encodeURIComponent(inputUrl);
		            var embedlyRequest = getProtocol() + '://api.embedly.com/1/extract?key=' + key + '&url=' + escapedUrl;
		            return $http({
		                method: 'GET',
		                url: embedlyRequest
		            });
		        };
		    }
		
		
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
							name: 'Create link',
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
						name: 'Create campaign link',
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
        
    embedly.$inject = ['embedlyService'];

    function embedly(embedlyService) {

        var directive = {
            link: link,
            restrict: 'E',
            controller: 'EmbedlyCtrl',
            scope: {
                urlsearch: '@',
                maxwidth: '@',
                scheme: '@',
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
                            scope.$parent.loading_embedly = false;
                            switch (data.data.type) {
                            case 'video':
                                if (data.data.html === undefined) {
                                    handleEmpty();
                                } else {
                                    scope.embedCode = data.data.html;
                                }
                                break;
                            case 'rich':
                                if (data.data.html === undefined) {
                                    handleEmpty();
                                } else {
                                    scope.embedCode = data.data.html;
                                }
                                break;
                            case 'photo':
                                if (data.data.url === undefined) {
                                    handleEmpty();
                                } else {
                                    scope.embedCode = '<img src="' + data.data.url + '">';
                                }
                                break;
                            case 'html':
                                scope.embedCode = data.data;
                                break;
                            default:
                                // call the dev's handling code, he probably assumed he would get a video 
                                // or photo (otherwise he'd use a different tool), so for him this result
                                // is the same as an empty result.
                                handleEmpty();
                                scope.embedCode = '';
                            }
                            if (previousEmbedCode !== scope.embedCode) { // In the original model, this was used instead of a template.
                                // embed code was changed from last call and has to be replaced in DOM
                                //element.html(scope.embedCode);
                            }
                        }, function (error) {
                            //TODO: Build out error handling better...
                            console.log("embed error:", error);
                            // promise rejected
                            scope.$parent.loading_embedly = false;
                            var previousEmbedCode = scope.embedCode;
                            scope.embedCode = '';

                            if (previousEmbedCode !== scope.embedCode) {
                                element.html(scope.embedCode);
                            }
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
