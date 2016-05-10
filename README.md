# create.ly
A campaign link creator for cool kids.

## Install and setup Prereqs
Open terminal and run:

```bash
$ cd apps
$ npm install -g yo stamplay-cli grunt-cli bower generator-angm
$ git clone git@github.com:emotivhq/create.ly.git ; cd create.ly
```

## Running project in dev
Open terminal and run:

```bash
$ grunt dev
```

## Running project 
Open terminal and run:

```bash
$ grunt build
```

> #CHANOTE: This will concat & minify all application files and the HTML templates will be mixed in one file called `templates.js`, and will be injected into **index.html**.

### Deploy
Open terminal and run:
```bash
$ stamplay deploy
```

# SubGenerators
To create a new module or directive.

1. Modules
2. Directives

## Modules
To create a module just run in Terminal/Shell:

```
$ yo angm:angm-module
```

After that, enter module name and choose which files to include.

The subgenerator will produce the following directory structure:

```
	moduleName/
		moduleName.html
		moduleNameModule.js
		moduleNameCtrl.js
		moduleNameRoute.js
		moduleNameService.js
		moduleName-test.js
```

**Note: Subgenerators are to be run from the root directory of this app.**

## Directives
To create a directive just type on your terminal window:

```
$ yo angm:angm-directive
```

After that you must entry the directive name and choose what dependencies you want, by default we using external templates and external controllers.

The subgenerator will produce the following directory structure:

```
shared/
		directives/
			directiveName/
				assets/ /* optional folder
				directiveName.html
				directiveNameCtrl.j
				directiveName-test.js
```

# Application files:
## View (Html Template)
File: `app/modules/moduleName/moduleName.html`.

Code:
```html
<div>
	Content from: "Page = moduleName"
</div>
```
---
## Controller

File: `app/modules/moduleName/moduleNameCtrl.js`.

Code:
```javascript
'use strict';

/**
 * @ngdoc function
 * @name appName.controller:moduleNameCtrl
 * @description
 * # moduleNameCtrl
 * Controller of the appName
 */
angular.module('create-ly')
	.controller('ModuleNameCtrl', ModuleNameCtrl);

	ModuleNameCtrl.$inject = ['Array of Dependencies optional'];

	function ModuleNameCtrl ('Array of Dependencies is the same above') {

	}

```
---

## Route

File: `app/modules/moduleName/moduleNameRoute.js`.

Code:
```javascript
'use strict';

/**
 * @ngdoc function
 * @name appName.route:moduleNameRoute
 * @description
 * # moduleNameRoute
 * Route of the appName
 */
angular.module('appName')
	.config(function ($stateProvider) {
		$stateProvider
			.state('moduleName', {
				url: '/moduleName',
				templateUrl: 'appName/modules/moduleName/moduleName.html',
				controller: 'moduleNameCtrl',
				controllerAs: 'vm'
			});
	});
```
---

## Module

File: `app/modules/moduleName/moduleNameModule.js`.

Code:
```javascript
'use strict';

/**
 * @ngdoc function
 * @name appName.route:moduleNameModule
 * @description
 * # moduleNameModule
 * Route of the appName
 */

 (function() {
   'use strict';

   angular.module('moduleName', []);

 })();
```
---

## App script

File: `app/app.js`.

Code:
```javascript
(function() {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main module of the application.
	 */

	angular.module('create-ly', [
		'ngResource',
		'ngAria',
		 'ngMaterial',
		'ngMdIcons',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ui.router',
		'home',
	]);

})();

```
---

## App config script

File: `app/app-config.js`.

Code:
```javascript
((function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('ang-modular')
		.config(configure)
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


		$urlRouterProvider
			.otherwise('/dashboard');

	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';

		console.log('AngularJS run() function...');
	}
})();
```
---

# Gruntfile tasks
By default, new scripts are added to the `index.html` file. Using Grunt-injector, but only on setup configuration, after that you must run `grunt injector` or `grunt dev` every time you add a new module, directive or script.


# Bower Components

The following packages are always installed by the angm-generator:

* "json3"
* "es5-shim"
* "bootstrap"
* "angular"
* "angular-resource"
* "angular-aria"
* "angular-mocks"
* "angular-touch"
* "angular-bootstrap"
* "angular-ui-router"

> NOTE: Angular Material have the following dependencies:
* angular-material-icons
* angular-material
* angular-messages


The following modules are optional on first install:

* "angular-cookies"
* "angular-animate"
* "angular-sanitize"

All of these can be updated with `bower update` as new versions of AngularJS are released. Always on first install the generator will use the last stable version of all libraries.


# Testing

We implemented only one kind of test at this moment: Unit tests. On next weeks e2e tests will be available too.

## Running Tests

The tests are written in **Jasmine**, which we run with the [Karma Test Runner][karma]. We provide a Karma configuration file pre-configured with some default options to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found on each module created named as `moduleName-test.js`.

The easiest way to run the unit tests is to use the supplied npm script on `package.json` file:

```
npm test
```

This script will start the Karma test runner to execute the unit tests.
