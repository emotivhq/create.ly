(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:linkcreatorDirective
	* @description
	* # linkcreatorDirective
	* Directive of the app
	*/

	angular
		.module('create-ly')
		.directive('linkCreator', linkCreator);

		function linkCreator () {

			var directive = {
				link: link,
				restrict: 'EA',
				controller: 'LinkCreatorCtrl',
				
				templateUrl:'app/modules/shared/directives/linkcreator/linkcreator.html',
				
			}

			return directive;

			function link(scope, element, attrs) {
				// write your code here
			}

		}

})();
