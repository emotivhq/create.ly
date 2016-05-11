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
