(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:widgetinstallTest
	 * @description
	 * # widgetinstallTest
	 * Test of the app
	 */

	describe('widgetinstall test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('gsConcierge');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('WidgetinstallCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
