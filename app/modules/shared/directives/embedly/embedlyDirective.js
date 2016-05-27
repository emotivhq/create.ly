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
        
    embedly.$inject = ['embedlyService', 'CreateDataService', '$timeout'];

    function embedly(embedlyService, CreateDataService, $timeout) {

        var directive = {
            link: link,
            restrict: 'E',
            controller: 'EmbedlyCtrl',
            scope: {
                urlsearch: '@',
                maxwidth: '@',
                scheme: '@',
                hideimage: '@',
                updateimage: '@',
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
                                    // if (CreateDataService.cardImage) {
                                    //     scope.cardImage = CreateDataService.cardImage;
                                    //     console.log('CreateDataService: ' + scope.cardImage);
                                    // } else if (!CreateDataService.cardImage && scope.embedCode.images[0].url){
                                        CreateDataService.cardImage = scope.embedCode.images[0].url;
                                        scope.cardImage = scope.embedCode.images[0].url;
                                        console.log('embedCode.images[0].url: ' + scope.cardImage);
                                    //}
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
