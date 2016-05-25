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
	]);

})();
