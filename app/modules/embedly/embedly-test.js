(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:embedlyTest
	 * @description
	 * # embedlyTest
	 * Test of the app
	 */

	describe('embedly test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('gsConcierge');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('EmbedlyCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
