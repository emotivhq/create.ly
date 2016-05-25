(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:filestackDirective
	* @description
	* # filestackDirective
	* Directive of the app
	*/

	angular
		.module('gsConcierge')
		.directive('filepickerDirective', filepickerDirective)
		.directive('filepickerPreview', filepickerPreviewDirective);

	filepickerDirective.$inject = ['$rootScope', 'filepickerService', '$parse'];
	function filepickerDirective($rootScope, filepickerService, $parse){
		    return {
		        restrict: 'A',
		        scope:{
		            onSuccess:'&'
		        },
		        link: function(scope, element, attrs) {
		            var key, value;
		            /*
		                pass original event
		            */
		            element.bind('change', function(event) {
		                event.preventDefault();
		                scope.onSuccess({event: event.originalEvent || event});
		                $rootScope.$apply();
		            });
		
		            element = element.length ? element[0] : element;
		
		            for (key in attrs.$attr){
		                value = attrs.$attr[key];
		                element.setAttribute(value, attrs[key]);
		            }
		
		            filepickerService.constructWidget(element);
		        }
		    };
		}
		
		filepickerPreviewDirective.$inject = ['$rootScope', 'filepickerService'];
		function filepickerPreviewDirective($rootScope, filepickerService){
		
			return {
		        restrict: 'A',
		        scope:{
		            url: '=',
		        },
		        link: function(scope, element, attrs) {
		            var url = scope.url;
		
		            var iframe = document.createElement('iframe');
		            iframe.src = url;
		
		            /* Set full size so it gets size from parrent element  */
		
		            iframe.width = '100%';
		            iframe.height = '100%';
		            angular.element(element).append(iframe);
		
		            scope.$watch('url', setUrl);
		
		            function setUrl(url){
		                if (!url) {    
		                    return; 
		                } else {
		                    url = url.replace('api/file/', 'api/preview/');
		                }
		                iframe.src = url;
		            }
		        }
		    };
		}

})();
