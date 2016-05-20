(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:bitlyTest
	 * @description
	 * # bitlyTest
	 * Test of the app
	 */

	describe('bitly test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('gsConcierge');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('BitlyCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
