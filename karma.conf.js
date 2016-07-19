'use strict';

// Karma configuration
module.exports = function (config) {
	config.set({
		// Frameworks to use
		frameworks: ['jasmine'],

		// List of files / patterns to load in the browser
		files: [
			'src/bower_components/jquery/dist/jquery.js',
			'src/bower_components/es5-shim/es5-shim.js',
			'src/bower_components/json3/lib/json3.min.js',
			'src/bower_components/angular/angular.js',
			'src/bower_components/angular-aria/angular-aria.js',
			'src/bower_components/angular-resource/angular-resource.js',
			'src/bower_components/angular-mocks/angular-mocks.js',
			'src/bower_components/angular-cookies/angular-cookies.js',
			'src/bower_components/angular-sanitize/angular-sanitize.js',
			'src/bower_components/angular-animate/angular-animate.js',
			'src/bower_components/angular-touch/angular-touch.js',
			'src/bower_components/angular-ui-router/release/angular-ui-router.js',
			'src/bower_components/angular-aria/angular-aria.js',
			'src/bower_components/angular-material/angular-material.js',
			'src/bower_components/angular-messages/angular-messages.js',
			'src/bower_components/angular-material-icons/angular-material-icons.js',
			'app/app.js',
			'app/modules/home/homeModule.js',
			'app/modules/home/homeCtrl.js',
			'app/modules/home/homeRoute.js',
			'app/modules/home/homeService.js',
			'app/modules/home/home-test.js',
			'app/modules/create/createModule.js',
			'app/modules/create/createCtrl.js',
			'app/modules/create/createRoute.js',
			'app/modules/create/createService.js',
			'app/modules/create/create-test.js',
			'app/modules/usersync/usersyncModule.js',
			'app/modules/usersync/usersyncCtrl.js',
			'app/modules/usersync/usersyncRoute.js',
			'app/modules/usersync/usersyncService.js',
			'app/modules/usersync/usersync-test.js',
			'app/modules/embedly/embedlyModule.js',
			'app/modules/embedly/embedlyCtrl.js',
			'app/modules/embedly/embedlyRoute.js',
			'app/modules/embedly/embedlyService.js',
			'app/modules/embedly/embedly-test.js',
			'app/modules/bitly/bitlyModule.js',
			'app/modules/bitly/bitlyCtrl.js',
			'app/modules/bitly/bitlyRoute.js',
			'app/modules/bitly/bitlyService.js',
			'app/modules/bitly/bitly-test.js',
			'app/modules/filestack/filestackModule.js',
			'app/modules/filestack/filestackCtrl.js',
			'app/modules/filestack/filestackRoute.js',
			'app/modules/filestack/filestackService.js',
			'app/modules/filestack/filestack-test.js',
			'app/modules/widgetinstall/widgetinstallModule.js',
			'app/modules/widgetinstall/widgetinstallCtrl.js',
			'app/modules/widgetinstall/widgetinstallRoute.js',
			'app/modules/widgetinstall/widgetinstallService.js',
			'app/modules/widgetinstall/widgetinstall-test.js',
			'app/modules/install/installModule.js',
			'app/modules/install/installCtrl.js',
			'app/modules/install/installRoute.js',
			'app/modules/install/installService.js',
			'app/modules/install/install-test.js',
		],

		// Test results reporter to use
		// Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		//reporters: ['progress'],
		reporters: ['spec'],

		plugins : [
			'karma-jasmine',
			'karma-coverage',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-spec-reporter'
		],

		// Web server port
		port: 9876,

		// Enable / disable colors in the output (reporters and logs)
		colors: true,

		// Level of logging
		// Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// Enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// If true, it capture browsers, run tests and exit
		singleRun: true
	});
};
