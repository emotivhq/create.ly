angular.module('gsConcierge').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/create/create.html',
    "<div layout=\"row\" layout-margin layout=\"column\" data-ng-controller=\"CreateCtrl\" ng-cloak>\n" +
    "    <div flex>\n" +
    "        <md-card>\n" +
    "            <md-card-title>\n" +
    "                <md-card-title-text>\n" +
    "                    <span class=\"md-headline\">Create a custom campaign</span>\n" +
    "                    <span class=\"md-subhead\">Creating a custom GiftStarter campaign has never been so easy. Simply copy/paste any product link into the input below.</span>\n" +
    "                </md-card-title-text>\n" +
    "            </md-card-title>\n" +
    "            <md-card-content>\n" +
    "                <div>\n" +
    "                    <form name=\"productForm\">\n" +
    "                        <md-input-container>\n" +
    "                            <label>Enter <em>any</em> product URL:</label>\n" +
    "                            <input name=\"product_url\" ng-model=\"input_product_url\" required ng-pattern=\"/^.+@.+\\..+$/\"></input>\n" +
    "\n" +
    "                            <!--<div class=\"hint\" ng-show=\"showHints\">example: https://www.organicbeardsupply.com/products/organic-beard-oil-spice-scent-1oz-dropper</div>-->\n" +
    "                            <!--<div ng-messages=\"productForm.product_url.$error\" ng-show=\"!showHints\">-->\n" +
    "                            <!--    <div ng-message-exp=\"['required', 'pattern']\">-->\n" +
    "                            <!--        That doesn't look like an product url... Are ou sure you entered the right thing?-->\n" +
    "                            <!--    </div>-->\n" +
    "                            <!--</div>-->\n" +
    "                        </md-input-container>\n" +
    "                        <md-button class=\"md-raised md-primary\" ng-click=\"showProductPreview()\">Get Product Info</md-button>\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "            </md-card-content>\n" +
    "        </md-card>\n" +
    "    </div>\n" +
    "    <div flex ng-show=\"show_product_preview\">\n" +
    "        <h2>Preview Campaign</h2>\n" +
    "        <p>Below is the information we were able to grab from the url you provided.</p>\n" +
    "        <div>\n" +
    "            <em-embed urlsearch=\"{{product_url}}\" maxwidth=\"100%\" onempty=\"tryAgain()\"></em-embed>\n" +
    "            <!-- https://github.com/Urigo/angular-embedly -->\n" +
    "        </div>\n" +
    "        <md-button class=\"md-raised md-primary\" ng-click=\"hideProductPreview()\">Close Preview</md-button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div layout=\"row\" layout-margin layout=\"column\" data-ng-controller=\"CreateCtrl\" ng-cloak>\n" +
    "    <div flex>\n" +
    "        <md-card>\n" +
    "            <md-toolbar>\n" +
    "                <div class=\"md-toolbar-tools\">\n" +
    "                    <h2>\n" +
    "                        <md-icon md-svg-icon=\"md-menu\"></md-icon>\n" +
    "                        <span>Create custom campaign</span>\n" +
    "                    </h2>\n" +
    "                </div>\n" +
    "            </md-toolbar>\n" +
    "            <md-stepper-card-content class=\"md-no-padding\">\n" +
    "                <md-steppers md-dynamic-height md-stretch-steppers=\"always\" md-selected=\"vm.selectedStep\" md-busy-text=\"'Fetching data & other things...'\" md-busy=\"vm.showBusyText\">\n" +
    "                    <md-step label=\"Enter Url\" md-complete=\"vm.stepData[0].data.completed\" ng-disabled=\"vm.stepProgress < 1\">\n" +
    "                        <md-step-body>\n" +
    "                            <form name=\"step1\" ng-submit=\"vm.submitCurrentStep(vm.stepData[0].data)\">\n" +
    "                                <md-content class=\"md-padding\">\n" +
    "                                    <div layout=\"row\" layout-align=\"center top\">\n" +
    "                                        <div flex=\"nogrow\" style=\"width: 400px\">\n" +
    "                                            <span class=\"md-subhead\">Creating a custom GiftStarter campaign has never been so easy. Simply copy/paste any link into the input below.</span>\n" +
    "                                            <md-input-container class=\"md-block\">\n" +
    "                                                <label>Paste a valid URL</label>\n" +
    "                                                <input name=\"product_url\" ng-model=\"vm.stepData[0].data.product_url\" ng-pattern=\"/^.+@.+\\..+$/\" ng-disabled=\"vm.stepData[0].data.completed\" required></input>\n" +
    "                                                <div ng-messages=\"step1.product_url.$error\">\n" +
    "                                                    <div ng-message=\"required\">\n" +
    "                                                        A valid URL is required\n" +
    "                                                    </div>\n" +
    "                                                </div>\n" +
    "                                            </md-input-container>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </md-content>\n" +
    "                                <md-step-actions layout=\"row\">\n" +
    "                                    <div flex layout=\"row\" layout-align=\"end top\">\n" +
    "                                        <md-button class=\"md-warn\">Cancel</md-button>\n" +
    "                                        <md-button type=\"submit\" ng-disabled=\"!vm.stepData[0].data.product_url || vm.showBusyText\" class=\"md-primary md-raised\">Next</md-button>\n" +
    "                                    </div>\n" +
    "                                </md-step-actions>\n" +
    "                            </form>\n" +
    "                        </md-step-body>\n" +
    "                    </md-step>\n" +
    "                    <md-step label=\"Review details\" md-complete=\"vm.stepData[1].data.completed\" ng-disabled=\"vm.stepProgress < 2\">\n" +
    "                        <md-step-body>\n" +
    "                            <em-embed urlsearch=\"{{vm.stepData[0].data._product_url}}\" maxwidth=\"100%\" onempty=\"tryAgain()\"></em-embed>\n" +
    "                        </md-step-body>\n" +
    "                    </md-step>\n" +
    "                    <md-step label=\"Customize\" md-complete=\"vm.stepData[2].data.completed\" ng-disabled=\"vm.stepProgress < 3\">\n" +
    "                        <md-step-body>\n" +
    "                            <form name=\"step2\">\n" +
    "                                <md-content class=\"md-padding\">\n" +
    "                                    <div layout=\"row\" layout-align=\"center top\">\n" +
    "                                        <div flex=\"nogrow\" style=\"width: 400px\">\n" +
    "                                            <h4>Please enter yout full name</h4>\n" +
    "                                            <md-input-container class=\"md-block\">\n" +
    "                                                <label>Your first name here</label>\n" +
    "                                                <input name=\"firsname\" ng-model=\"vm.stepData[1].data.firsname\"/>\n" +
    "                                            </md-input-container>\n" +
    "                                            <md-input-container class=\"md-block\">\n" +
    "                                                <label>Your last name</label>\n" +
    "                                                <input name=\"lastname\" ng-model=\"vm.stepData[1].data.lastname\"/>\n" +
    "                                            </md-input-container>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </md-content>\n" +
    "                                <md-step-actions layout=\"row\">\n" +
    "                                    <div flex>\n" +
    "                                        <md-button ng-click=\"vm.moveToPreviousStep()\">PREVIOUS</md-button>\n" +
    "                                    </div>\n" +
    "                                    <div flex layout=\"row\" layout-align=\"end top\">\n" +
    "                                        <md-button class=\"md-warn\">CANCEL</md-button>\n" +
    "                                        <md-button ng-disabled=\"vm.showBusyText\" ng-click=\"vm.submitCurrentStep(vm.stepData[1].data, !(vm.stepData[1].data.firsname && vm.stepData[1].data.lastname))\" class=\"md-primary md-raised\">\n" +
    "                                            {{ vm.stepData[1].data.firsname && vm.stepData[1].data.lastname ? 'NEXT' : 'SKIP' }}\n" +
    "                                        </md-button>\n" +
    "                                    </div>\n" +
    "                                </md-step-actions>\n" +
    "                            </form>\n" +
    "                        </md-step-body>\n" +
    "                    </md-step>\n" +
    "                            \n" +
    "                    <md-step label=\"Finish\" md-complete=\"vm.stepData[3].data.completed\" ng-disabled=\"vm.stepProgress < 4\">\n" +
    "                        <md-step-body>\n" +
    "                            <form name=\"step3\">\n" +
    "                                <md-content class=\"md-padding\">\n" +
    "                                    <div layout=\"column\" layout-align=\"center center\" style=\"min-height: 200px\">\n" +
    "                                        <h4>Yasss! your custom campaign link was created.</h4>\n" +
    "                                        <md-button class=\"md-primary md-raised\">Create a campaign</md-button>\n" +
    "                                    </div>\n" +
    "                                </md-content>\n" +
    "                            </form>\n" +
    "                        </md-step-body>\n" +
    "                    </md-step>\n" +
    "                </md-steppers>\n" +
    "            </md-stepper-card-content>\n" +
    "        </md-card>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/modules/home/dashboard.html',
    "<div class=\"md-padding\" flex layout-sm=\"column\">\n" +
    "    <md-card class=\"text-center\">\n" +
    "        <md-card-content>\n" +
    "            <h1>{{ vm.title }}</h1>\n" +
    "            <div ng-controller=\"HomeCtrl\" layout=\"column\" ng-cloak class=\"md-inline-form\">\n" +
    "              <md-content md-theme=\"docs-dark\" layout-gt-sm=\"row\" layout-padding>\n" +
    "                <div>\n" +
    "                  <md-input-container>\n" +
    "                    <label>Title</label>\n" +
    "                    <input ng-model=\"user.title\">\n" +
    "                  </md-input-container>\n" +
    "                  <md-input-container>\n" +
    "                    <label>Email</label>\n" +
    "                    <input ng-model=\"user.email\" type=\"email\">\n" +
    "                  </md-input-container>\n" +
    "                </div>\n" +
    "              </md-content>\n" +
    "              <md-content layout-padding>\n" +
    "                <div>\n" +
    "                  <form name=\"userForm\">\n" +
    "                    <div layout-gt-xs=\"row\">\n" +
    "                      <md-input-container class=\"md-block\" flex-gt-xs>\n" +
    "                        <label>Company (Disabled)</label>\n" +
    "                        <input ng-model=\"user.company\" disabled>\n" +
    "                      </md-input-container>\n" +
    "                      <md-datepicker ng-model=\"user.submissionDate\" md-placeholder=\"Enter date\">\n" +
    "                      </md-datepicker>\n" +
    "                    </div>\n" +
    "                    <div layout-gt-sm=\"row\">\n" +
    "                      <md-input-container class=\"md-block\" flex-gt-sm>\n" +
    "                        <label>First name</label>\n" +
    "                        <input ng-model=\"user.firstName\">\n" +
    "                      </md-input-container>\n" +
    "                      <md-input-container class=\"md-block\" flex-gt-sm>\n" +
    "                        <label>Last Name</label>\n" +
    "                        <input ng-model=\"theMax\">\n" +
    "                      </md-input-container>\n" +
    "                    </div>\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                      <label>Address</label>\n" +
    "                      <input ng-model=\"user.address\">\n" +
    "                    </md-input-container>\n" +
    "                    <md-input-container md-no-float class=\"md-block\">\n" +
    "                      <input ng-model=\"user.address2\" placeholder=\"Address 2\">\n" +
    "                    </md-input-container>\n" +
    "                    <div layout-gt-sm=\"row\">\n" +
    "                      <md-input-container class=\"md-block\" flex-gt-sm>\n" +
    "                        <label>City</label>\n" +
    "                        <input ng-model=\"user.city\">\n" +
    "                      </md-input-container>\n" +
    "                      <md-input-container class=\"md-block\" flex-gt-sm>\n" +
    "                        <label>State</label>\n" +
    "                        <md-select ng-model=\"user.state\">\n" +
    "                          <md-option ng-repeat=\"state in states\" value=\"{{state.abbrev}}\">\n" +
    "                            {{state.abbrev}}\n" +
    "                          </md-option>\n" +
    "                        </md-select>\n" +
    "                      </md-input-container>\n" +
    "                      <md-input-container class=\"md-block\" flex-gt-sm>\n" +
    "                        <label>Postal Code</label>\n" +
    "                        <input name=\"postalCode\" ng-model=\"user.postalCode\" placeholder=\"12345\"\n" +
    "                               required ng-pattern=\"/^[0-9]{5}$/\" md-maxlength=\"5\">\n" +
    "                        <div ng-messages=\"userForm.postalCode.$error\" role=\"alert\" multiple>\n" +
    "                          <div ng-message=\"required\" class=\"my-message\">You must supply a postal code.</div>\n" +
    "                          <div ng-message=\"pattern\" class=\"my-message\">That doesn't look like a valid postal\n" +
    "                            code.\n" +
    "                          </div>\n" +
    "                          <div ng-message=\"md-maxlength\" class=\"my-message\">\n" +
    "                            Don't use the long version silly...we don't need to be that specific...\n" +
    "                          </div>\n" +
    "                        </div>\n" +
    "                      </md-input-container>\n" +
    "                    </div>\n" +
    "                    <md-input-container class=\"md-block\">\n" +
    "                      <label>Biography</label>\n" +
    "                      <textarea ng-model=\"user.biography\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus></textarea>\n" +
    "                    </md-input-container>\n" +
    "                  </form>\n" +
    "                </div>\n" +
    "              </md-content>\n" +
    "            </div>            \n" +
    "            \n" +
    "            \n" +
    "\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "    <div ng-controller=\"SidenavCtrl as vm\" ng-cloak>\n" +
    "        <md-toolbar class=\"md-tall md-accent\">\n" +
    "            <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"80\" style=\"margin-top: 0;\">\n" +
    "                        <img src=\"/app/assets/images/logo-web-white.png\" class=\"logo\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-list>\n" +
    "            <md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo('home.' + item.link)\">\n" +
    "                <div class=\"inset\" ng-show=\"item.icon\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p > {{ item.name }}</p>\n" +
    "            </md-list-item>\n" +
    "            <md-divider></md-divider>\n" +
    "            <md-subheader>Admin</md-subheader>\n" +
    "            <md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.navigateTo(item.link)\" >\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.title }}</p>\n" +
    "            </md-list-item>\n" +
    "        </md-list>\n" +
    "    </div>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
    "    <md-toolbar class=\"md-accent\" ng-show=\"!showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "                <ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <span flex></span>\n" +
    "            <md-menu>\n" +
    "                <md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "                    <md-icon> more_vert </md-icon>\n" +
    "                </md-button>\n" +
    "                <md-menu-content width=\"4\">\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "                            <md-icon>face</md-icon>\n" +
    "                            Profile\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changePassword()\">\n" +
    "                            <md-icon>lock</md-icon>\n" +
    "                            Password\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-divider></md-menu-divider>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.logOut()\">\n" +
    "                            <md-icon>power_settings_new</md-icon>\n" +
    "                            Logout\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                </md-menu-content>\n" +
    "            </md-menu>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-toolbar class=\"md-hue-1\" ng-show=\"showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"showSearch = !showSearch\" aria-label=\"Back\">\n" +
    "                <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3 flex=\"10\">\n" +
    "                Back\n" +
    "            </h3>\n" +
    "            <md-input-container md-theme=\"input\" flex>\n" +
    "                <label>&nbsp;</label>\n" +
    "                <input ng-model=\"search.who\" placeholder=\"Search ...\">\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-content layout=\"column\" flex md-scroll-y style=\"background-color:#DCDCDC\">\n" +
    "        <div ui-view></div>\n" +
    "    </md-content>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/layouts/main-page/main-page.html',
    "    <md-toolbar class=\"md-accent\" ng-show=\"!showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "                <ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3>\n" +
    "                <a href=\"/\">Welcome</a>\n" +
    "            </h3>\n" +
    "            <span flex></span>\n" +
    "            <md-menu>\n" +
    "                <md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">\n" +
    "                            <md-icon> more_vert </md-icon>\n" +
    "                </md-button>\n" +
    "                <md-menu-content width=\"4\">\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changeProfile($event)\">\n" +
    "                            <md-icon>face</md-icon>\n" +
    "                            Profile\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.changePassword()\">\n" +
    "                            <md-icon>lock</md-icon>\n" +
    "                            Password\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                    <md-menu-divider></md-menu-divider>\n" +
    "                    <md-menu-item>\n" +
    "                        <md-button ng-click=\"layout.logOut()\">\n" +
    "                            <md-icon>power_settings_new</md-icon>\n" +
    "                            Logout\n" +
    "                        </md-button>\n" +
    "                    </md-menu-item>\n" +
    "                </md-menu-content>\n" +
    "            </md-menu>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-toolbar class=\"md-hue-1\" ng-show=\"showSearch\">\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"showSearch = !showSearch\" aria-label=\"Back\">\n" +
    "                <ng-md-icon icon=\"arrow_back\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <h3 flex=\"10\">\n" +
    "                Back\n" +
    "            </h3>\n" +
    "            <md-input-container md-theme=\"input\" flex>\n" +
    "                <label>&nbsp;</label>\n" +
    "                <input ng-model=\"search.who\" placeholder=\"Search ...\">\n" +
    "            </md-input-container>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-content class=\"md-blue-grey-theme\" flex md-scroll-y>\n" +
    "        <ui-view layout=\"column\" layout-fill layout-padding>\n" +
    "\n" +
    "\n" +
    "        </ui-view>\n" +
    "    </md-content>\n"
  );


  $templateCache.put('app/modules/layouts/side-nav/sidenav.html',
    "        <md-toolbar class=\"md-tall\">\n" +
    "            <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"20\">\n" +
    "                        <img style=\"width: 36px; height: 36px; border-radius: 50%\"\n" +
    "                             actual-src=\"data:image/jpeg;base64,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\"\n" +
    "                             showloader=\"\" loader-class=\"preload\" loader-src=\"app/assets/images/loader.gif\"\n" +
    "                             src=\"data:image/jpeg;base64,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\">\n" +
    "                    </div>\n" +
    "                    <div flex=\"80\" style=\"margin-top: 10px;font-size: 1em;\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-list>\n" +
    "            <md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo(item.link)\" >\n" +
    "                <div class=\"inset\" ng-show=\"item.icon\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.name }}</p>\n" +
    "            </md-list-item>\n" +
    "            <md-divider></md-divider>\n" +
    "            <md-subheader>Concierge Admin</md-subheader>\n" +
    "            <md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\" >\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.title }}</p>\n" +
    "            </md-list-item>\n" +
    "        </md-list>\n"
  );


  $templateCache.put('app/modules/shared/directives/linkcreator/linkcreator.html',
    "<div><!-- Template Contente if you use templateUrl --></div>\n"
  );

}]);
