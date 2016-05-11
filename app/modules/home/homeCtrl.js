(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('gsConcierge')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService', '$scope'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService, $scope) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "Welcome";
		vm.version = "1.0";
		vm.listFeatures = homeService.getFeaturesList();
		
		$scope.user = {
	      title: 'Developer',
	      email: 'ipsum@giftstarter.com',
	      firstName: '',
	      lastName: '',
	      company: 'GiftStarter',
	      address: '100 over there',
	      city: 'Seattle',
	      state: 'WA',
	      biography: 'Just another profile of a bot',
	      postalCode: '98118'
	    };
	    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
	    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
	    'WY').split(' ').map(function(state) {
			return {abbrev: state};
	    });

	}

})();
