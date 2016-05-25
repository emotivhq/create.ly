(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name app.controller:embedlyDirective
     * @description
     * # embedlyDirective
     * Directive of the app
     */

    angular
        .module('gsConcierge')
        .directive('embedly', embedly);
        
    embedly.$inject = ['embedlyService', '$timeout'];

    function embedly(embedlyService, $timeout) {

        var directive = {
            link: link,
            restrict: 'E',
            controller: 'EmbedlyCtrl',
            scope: {
                urlsearch: '@',
                maxwidth: '@',
                scheme: '@',
                onempty: '&'
            },
            templateUrl: '/app/modules/shared/directives/embedly/embedly.html'
        };

        return directive;

        function link(scope, element, attrs) {
            // This function should be called when the oEmbed returns no embed code
            function handleEmpty() {
                if (scope.onempty !== undefined && typeof (scope.onempty) === "function") {
                    scope.onempty();
                }
            }

            scope.$parent.loading_embedly = false;

            scope.$watch('urlsearch', function (newVal) {
                var previousEmbedCode = scope.embedCode;
                if (newVal) {
                    scope.$parent.loading_embedly = true;
                    embedlyService.extract(newVal, scope.maxwidth, scope.scheme)
                        .then(function (data) {
                            if (previousEmbedCode !== data.data) {
                                var fetchSuccess = true;
                                switch (data.data.type) {
                                case 'html':
                                    scope.embedCode = data.data;
                                    break;
                                case 'video':
                                case 'rich':
                                    if (data.data.html === undefined) {
                                        fetchSuccess = false;
                                    } else {
                                        scope.embedCode = data.data;
                                    }
                                    break;
                                case 'photo':
                                case 'image':
                                    if (data.data.url === undefined) {
                                        fetchSuccess = false;
                                    } else {
                                        scope.embedCode = data.data;
                                    }
                                    break;
                                default:
                                    fetchSuccess = false;
                                    break;
                                }
                                if (!fetchSuccess) {
                                    handleEmpty();
                                    scope.embedCode = '';
                                    scope.$parent.$broadcast('embedly-fetch-error');
                                } else {
                                    scope.$parent.$broadcast('embedly-fetch-success');
                                }
                            }
                        }, function (error) {
                            // promise rejected
                            scope.embedCode = '';
                            scope.$parent.$broadcast('embedly-fetch-error');
                            handleEmpty();
                        }).finally(function() {
                            scope.$parent.loading_embedly = false;
                        });
                }
            });
        }

    }

})();
