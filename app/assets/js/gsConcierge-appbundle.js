/*!
* gsConcierge - v0.0.1 - MIT LICENSE 2016-05-11. 
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
		'angular-embedly',
		'md-steppers',
		'ui.router',
		'home',
		'create',
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

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider', '$mdIconProvider', 'embedlyServiceProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider, $mdIconProvider, embedlyServiceProvider) {


		embedlyServiceProvider.setKey('3853b5f70b824643bd1c416b72c29d75');
		
		$mdThemingProvider
			.theme('default')
			.primaryPalette('blue', {
				'default': '600'
			})
			.accentPalette('indigo', {
				'default': '500'
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

	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';

		console.log('AngularJS run() function...');
	}


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
			});
			
	}]);

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

		Create.$inject = ['$scope', '$q', '$timeout', '$mdToast',];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Create($scope, $q, $timeout, $mdToast) {
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
			
			$scope.tryAgain = function() {
				$mdToast.show(
					$mdToast.simple()
					.content('Tray again, nothing returned')
					.position('bottom right')
					.hideDelay(2000)
				);
			};
			
			vm.selectedStep = 0;
			vm.stepProgress = 1;
			vm.maxStep = 4;
			vm.showBusyText = false;
			// Setup the initial step data
			vm.stepData = [
				{ step: 1, completed: false, optional: false, data: {} },
				{ step: 2, completed: false, optional: false, data: {} },
				{ step: 3, completed: false, optional: false, data: {} },
				{ step: 4, completed: false, optional: false, data: {} },
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
		
			vm.submitCurrentStep = function submitCurrentStep(stepData, isSkip) {
				var deferred = $q.defer();
				vm.showBusyText = true;
				console.log('On before submit');
				if (!stepData.completed && !isSkip) {
				    //simulate $http
				    $timeout(function () {
				        vm.showBusyText = false;
				        console.log('Step success, #chaboi style');
				        deferred.resolve({ status: 200, statusText: 'success', data: {} });
				        //move to next step when success
				        stepData.completed = true;
				        vm.enableNextStep();
				    }, 1000);
				} else {
				    vm.showBusyText = false;
				    vm.enableNextStep();
				}
			};

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
				link: 'showListBottomSheet($event)',
				title: 'Settings',
				icon: 'settings'
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
							name: 'Create',
							icon: 'create',
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
