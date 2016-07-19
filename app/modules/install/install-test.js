(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:installTest
	 * @description
	 * # installTest
	 * Test of the app
	 */

	describe('install test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('gsConcierge');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('InstallCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
