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
					{
						link: 'widgetinstall',
						name: 'Install Widget',
						icon: 'picture_in_picture',
						hide: false
					}

			    
			];

			return {
				listMenu: function () {
					return menu;
				}
			};

		}

})();
