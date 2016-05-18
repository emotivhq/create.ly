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
		'angular-embedly',
		'md-steppers',
		'ui.router',
		'home',
		'create',
		'usersync',
		'embedly',
	]);

})();
