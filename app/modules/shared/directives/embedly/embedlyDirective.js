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
        
    embedly.$inject = ['embedlyService'];

    function embedly(embedlyService) {

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
                            scope.$parent.loading_embedly = false;
                            switch (data.data.type) {
                            case 'video':
                                if (data.data.html === undefined) {
                                    handleEmpty();
                                } else {
                                    scope.embedCode = data.data.html;
                                }
                                break;
                            case 'rich':
                                if (data.data.html === undefined) {
                                    handleEmpty();
                                } else {
                                    scope.embedCode = data.data.html;
                                }
                                break;
                            case 'photo':
                                if (data.data.url === undefined) {
                                    handleEmpty();
                                } else {
                                    scope.embedCode = '<img src="' + data.data.url + '">';
                                }
                                break;
                            case 'html':
                                scope.embedCode = data.data;
                                break;
                            default:
                                // call the dev's handling code, he probably assumed he would get a video 
                                // or photo (otherwise he'd use a different tool), so for him this result
                                // is the same as an empty result.
                                handleEmpty();
                                scope.embedCode = '';
                            }
                            if (previousEmbedCode !== scope.embedCode) { // In the original model, this was used instead of a template.
                                // embed code was changed from last call and has to be replaced in DOM
                                //element.html(scope.embedCode);
                            }
                        }, function (error) {
                            //TODO: Build out error handling better...
                            console.log("embed error:", error);
                            // promise rejected
                            scope.$parent.loading_embedly = false;
                            var previousEmbedCode = scope.embedCode;
                            scope.embedCode = '';

                            if (previousEmbedCode !== scope.embedCode) {
                                element.html(scope.embedCode);
                            }
                        });
                }
            });
        }

    }

})();
