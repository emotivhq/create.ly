(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:embedlyService
	 * @description
	 * # embedlyService
	 * Service of the app
	 */

    angular
		.module('embedly')
		.factory('EmbedlyService', Embedly);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Embedly.$inject = ['$http'];

		function Embedly ($http) {
			
			var vm = this;
            var key;
            var secure;
            vm.setKey = function(userKey) {
                key = userKey;
                return key;
            };
            vm.getKey = function() {
                return key;
            };
            vm.secure = function(value) {
                if (!value) {
                    return secure;
                }
                secure = value;
            };
    
            function getProtocol() {
                return secure ? 'https' : 'https' ;
            }
    
            function embedly($http) {
                vm.embed = function(inputUrl, maxwidth, scheme) {
                    var escapedUrl = encodeURIComponent(inputUrl);
                    var embedlyRequest = getProtocol() + '://api.embedly.com/1/oembed?key=' + key + '&url=' +  escapedUrl;
    
                    if(typeof maxwidth !== 'undefined'){
                        embedlyRequest = embedlyRequest + '&maxwidth=' + maxwidth;
                    }
    
                    if(typeof scheme !== 'undefined'){
                        embedlyRequest = embedlyRequest + '&scheme=' + scheme;
                    }
    
                    return $http({method: 'GET', url: embedlyRequest});
                };
                vm.extract = function(inputUrl) {
                    var escapedUrl = encodeURIComponent(inputUrl);
                    var embedlyRequest = getProtocol() + '://api.embedly.com/1/extract?key=' + key + '&url=' +  escapedUrl;
                    return $http({method: 'GET', url: embedlyRequest});
                };
            }
    
    
            vm.$get = ['$http', function($http) {
                return new embedly($http);
            }];

		}

})();
