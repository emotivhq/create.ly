(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:filestackTest
	 * @description
	 * # filestackTest
	 * Test of the app
	 */

	describe('filestack test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('gsConcierge');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('FilestackCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
