(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:createTest
	 * @description
	 * # createTest
	 * Test of the app
	 */

	describe('create test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('create-ly');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('CreateCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
