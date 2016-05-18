/**
 * Created by moran on 12/06/14.
 */

var angularEmbedly = angular.module('angular-embedly', []);
/**
 * Created by moran on 12/06/14.
 */

(function (module) {
    module.provider('embedlyService', function () {
        var key;
        var secure;
        this.setKey = function(userKey) {
            key = userKey;
            return key;
        }
        this.getKey = function() {
            return key;
        }
        this.secure = function(value) {
            if (!value) {
                return secure;
            }
            secure = value;
        }

        function getProtocol() {
            return secure ? 'https' : 'https' ;
        }

        function embedly($http) {
            this.embed = function(inputUrl, maxwidth, scheme) {
                var escapedUrl = encodeURIComponent(inputUrl);
                var embedlyRequest = getProtocol() + '://api.embed.ly/1/oembed?key=' + key + '&url=' +  escapedUrl;

                if(typeof maxwidth !== 'undefined'){
                    embedlyRequest = embedlyRequest + '&maxwidth=' + maxwidth;
                }

                if(typeof scheme !== 'undefined'){
                    embedlyRequest = embedlyRequest + '&scheme=' + scheme;
                }

                return $http({method: 'GET', url: embedlyRequest});
            };
            this.extract = function(inputUrl) {
                var escapedUrl = encodeURIComponent(inputUrl);
                var embedlyRequest = getProtocol() + '://api.embed.ly/1/extract?key=' + key + '&url=' +  escapedUrl;
                return $http({method: 'GET', url: embedlyRequest});
            };
        }


        this.$get = ['$http', function($http) {
            return new embedly($http);
        }];

    });
})(angularEmbedly);

/**
 * Created by moran on 12/06/14.
 */

(function (module) {
    module.controller('emEmbedCtrl', ['$scope', function($scope) {
        $scope.embedCode = '';
    }]);
})(angularEmbedly);
/**
 * Created by moran on 12/06/14.
 */

(function (module) {
    module.directive('emEmbed', ['embedlyService', function(embedlyService) {
        return {
            restrict: 'E',
            scope:{
                urlsearch: '@',
                maxwidth: '@',
                scheme: '@',
                onempty: '&'
            },
            controller: 'emEmbedCtrl',
            link: function(scope, element, attributes) {
                
                // This function should be called when the oEmbed returns no embed code
                function handleEmpty(){
                    if(scope.onempty != undefined && typeof(scope.onempty) == "function"){
                        scope.onempty();
                    }
                }
                
                function buildHTMLCard(data) {
                    var embedCode = '<md-card>\
                                        <md-card-header>\
                                          <md-card-avatar>\
                                            <img src="' + data.favicon_url + '"/>\
                                          </md-card-avatar>\
                                          <md-card-header-text>\
                                            <span class="md-title">' + data.provider_name + '</span>\
                                            <span class="md-subhead">' + data.provider_display + '</span>\
                                          </md-card-header-text>\
                                        </md-card-header>\
                                        <img src="' + data.images[0].url + '" class="md-card-image" alt="Washed Out">\
                                        <md-card-title>\
                                            <md-card-title-text>\
                                                <span class="md-headline">' + data.title + '</span>\
                                            </md-card-title-text>\
                                        </md-card-title>';
                    if (data.description && data.description.length > 0) {
                        embedCode += '<md-card-content>\
                                        <p>';
                        embedCode += data.description;
                        embedCode +=    '</p>\
                                      </md-card-content>';
                    }
                    
                    embedCode = angular.element('<div>' + embedCode + '</div>');
                    return embedCode.html();
                }
                
                scope.$parent.loading_embedly = false;

                scope.$watch('urlsearch', function(newVal) {
                    var previousEmbedCode = scope.embedCode;
                    if (newVal) {
                        scope.$parent.loading_embedly = true;
                        embedlyService.extract(newVal, scope.maxwidth, scope.scheme)
                            .then(function(data){
                                scope.$parent.loading_embedly = false;
                                switch(data.data.type) {
                                    case 'video':
                                        if(data.data.html == undefined){
                                            handleEmpty();
                                        }else{
                                            scope.embedCode = data.data.html;
                                        }
                                        break;
                                    case 'rich':
                                        if(data.data.html == undefined){
                                            handleEmpty();
                                        }else{
                                            scope.embedCode = data.data.html;
                                        }
                                        break;
                                    case 'photo':
                                        if(data.data.url == undefined){
                                            handleEmpty();
                                        }else{
                                            scope.embedCode = '<img src="' + data.data.url + '">';
                                        }
                                        break;
                                    case 'html':
                                        scope.embedCode = buildHTMLCard(data.data);
                                        break;
                                    default:
                                        // call the dev's handling code, he probably assumed he would get a video 
                                        // or photo (otherwise he'd use a different tool), so for him this result
                                        // is the same as an empty result.
                                        handleEmpty();
                                        scope.embedCode = '';
                                }
                                if(previousEmbedCode !== scope.embedCode) {
                                    // embed code was changed from last call and has to be replaced in DOM
                                    element.html(scope.embedCode);
                                }
                            }, function(error) {
                                //TODO: Build out error handling better...
                                console.log("embed error:", error);
                                // promise rejected
                                scope.$parent.loading_embedly = false;
                                var previousEmbedCode = scope.embedCode;
                                scope.embedCode = '';

                                if(previousEmbedCode !== scope.embedCode) {
                                    element.html(scope.embedCode);
                                }
                            });
                    }
                });
            }
        };
    }])
})(angularEmbedly);