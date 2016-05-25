(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:bitlyDirective
	* @description
	* # bitlyDirective
	* Directive of the app
	*/

	angular
		.module('gsConcierge')
		.directive('bitlyDirective', bitlyDirective);

		function bitlyDirective () {

			var directive = {
				restrict: 'A',
				controller: 'BitlyCtrl',
				scope: true,
				link: link,
				templateUrl:'app/modules/shared/directives/bitly/bitly.html',
				
			};

			return directive;

			function link(bitly, embedly, scope, element, attrs) {
				attrs.$observe('href', function(){
					scope.url = embedly.UrlToBitlify;
					//console.log("directive currentHref", a.href);
					var a = element[0];
					if(a.href){ 
						bitly.getShortUrl(a.href).then(function(data){
							a.href = data;
							//console.log("directive result", a.href);
						});
					}
				});
			}

		}

})();
