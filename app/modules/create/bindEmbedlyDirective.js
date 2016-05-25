'use strict';
(function() {
    angular
        .module('create')
        .directive('bindEmbedly', bindEmbedly);

    function bindEmbedly() {
        var directive = {
            restrict: 'A',
            link: linkBindEmbedly
        };

        return directive;

        function linkBindEmbedly(scope, elem) {

            var params = {
                cardTitleTextSelector: 'embedly md-card-title md-card-title-text',
                cardTitleHtml: '<md-card-title><md-card-title-text>Add title</md-card-title-text></md-card-title>',
                cardImage: '<img class="md-card-image" ng-src="http://placehold.it/350x150" src="http://placehold.it/350x150" /> ',
                cardImageSelector: 'embedly .md-card-image',
                embedlyImagesSelector: '.embedly-variation-images',
                embedlySelector: 'embedly',
                causeImgSelector: '.cause-img',
                causeTitleSelector: '.cause-title'
            }

            var mdCardTitleVal,
                causeImg,
                embedly,
                embedlyImages,
                mdCardImg,
                causeTitle;
            scope.$on('secondstep', function () {
                causeTitle = elem.find(params.causeTitleSelector);
                causeImg = elem.find(params.causeImgSelector);
                embedly = angular.element(document.querySelectorAll(params.embedlySelector)[0]);
                embedlyImages = angular.element(document.querySelectorAll(params.embedlyImagesSelector));
                mdCardTitleVal = angular.element(document.querySelectorAll(params.cardTitleTextSelector)[1]);
                mdCardImg = document.querySelectorAll(params.cardImageSelector)[1];

                function clickEmbedlyImageHandler() {
                    mdCardImg.src = this.src;
                }

                function addHandlersForImages(images) {
                    images.addEventListener('click', clickEmbedlyImageHandler)
                }

                angular.forEach(embedlyImages, addHandlersForImages);

                function cardTitleWatch (newValue) {
                    if (newValue) {
                        mdCardTitleVal.text(newValue);
                    }
                }

                function twoWayTitle () {
                    scope.cardTitle = mdCardTitleVal.text().toString().trim();
                    scope.$watch('cardTitle', cardTitleWatch);
                }

                function watchImageChange (newValue) {
                    if (newValue) {
                        mdCardImg.src = newValue.trim();
                    }
                }

                function twoWayImg () {
                    scope.cardImg = mdCardImg.src.toString().trim();
                    scope.$watch('cardImg', watchImageChange);
                }

                if (mdCardTitleVal) {
                    twoWayTitle();
                } else {
                    embedly.prepend(params.cardTitleHtml);
                    mdCardTitleVal = angular.element(document.querySelectorAll(params.cardTitleTextSelector)[0]);
                    twoWayTitle();
                }
                if (mdCardImg) {
                    twoWayImg();
                } else {
                    embedly.prepend(params.cardImage);
                    mdCardImg = document.querySelectorAll(params.cardImageSelector)[0];
                    twoWayImg();
                }
            });
        }
    }
})();
