(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:bitlyCtrl
	* @description
	* # bitlyCtrl
	* Controller of the app
	*/

	angular
		.module('bitly')
		.controller('BitlyCtrl', Bitly);

		Bitly.$inject = ['bitly', '$rootScope', '$scope'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Bitly(bitly, embedly, $scope) {
			/*jshint validthis: true */
			var vm = this;
			
			$scope.createBitly = function() {
				bitly.getShortUrl(embedly.UrlToBitlify).then(function(data){
					console.log("bit.ly DATA:", data);
					vm.bitlyUrl = data;
					$scope.bitlyUrl = data;
					console.log("Bit.ly", $scope.bitlyUrl);
				}, function(e){
					console.log("Bit.ly ERROR: ", e);
					vm.bitlyUrl = e;
					$scope.bitlyUrl = e;
				});
			};

		}

})();
