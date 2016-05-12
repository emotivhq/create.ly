(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:usersyncTest
	 * @description
	 * # usersyncTest
	 * Test of the app
	 */

	describe('usersync test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('gsConcierge');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('UsersyncCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
