angular.module('gsConcierge').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/create/create.html',
    "<div layout=\"row\" layout-margin layout-padding layout=\"column\" data-ng-controller=\"CreateCtrl\" ng-cloak class=\"create\">\n" +
    "    <div flex>\n" +
    "        <md-card>\n" +
    "            <md-toolbar>\n" +
    "                <div class=\"md-toolbar-tools\">\n" +
    "                    <h2>\n" +
    "                        <span>Create a campaign for a non-profit cause</span>\n" +
    "                    </h2>\n" +
    "                </div>\n" +
    "            </md-toolbar>\n" +
    "            <md-stepper-card-content class=\"md-no-padding\">\n" +
    "                <md-steppers md-dynamic-height md-stretch-steppers=\"always\" md-selected=\"vm.selectedStep\" md-busy-text=\"'Fetching data & other things...'\" md-busy=\"vm.showBusyText\">\n" +
    "                    <md-step label=\"Enter Url\" md-complete=\"vm.stepData[0].data.completed\" ng-disabled=\"vm.stepProgress < 1\">\n" +
    "                        <md-step-body>\n" +
    "                            <div layout=\"column\">\n" +
    "                                <div layout=\"row\" layout-padding>\n" +
    "                                    <div flex=\"75\" flex-offset=\"10\">\n" +
    "                                        <span class=\"md-title\">\n" +
    "                                            Paste any non-profit url\n" +
    "                                        </span>\n" +
    "                                        <form name=\"step1\">\n" +
    "                                            <div layout=\"row\" flex>\n" +
    "                                                <md-input-container flex class=\"md-block\">\n" +
    "                                                    <input name=\"product_url\" ng-model=\"vm.stepData[0].data.product_url\" ng-disabled=\"vm.showBusyText\" md-select-on-focus ng-pattern=\"urlPattern\" ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 300, blur: 300 } }\" required />\n" +
    "                                                    <div class=\"hint\" ng-show=\"showProductUrlHint\">{{productUrlHint}}</div>\n" +
    "                                                    <div ng-messages=\"step1.product_url.$error\" role=\"alert\">\n" +
    "                                                        <div ng-message-exp=\"['required','pattern']\">\n" +
    "                                                            That doesn't look like a valid url... are you sure you pasted the right thing?\n" +
    "                                                        </div>\n" +
    "                                                    </div>\n" +
    "                                                </md-input-container>\n" +
    "                                                <div>\n" +
    "                                                    <md-button type=\"submit\" class=\"md-raised\" ng-disabled=\"!vm.stepData[0].data.product_url || vm.showBusyText\" aria-label=\"Get URL Info\" ng-click=\"getUrlInfo(vm.stepData[0].data.product_url)\">\n" +
    "                                                        <md-icon class=\"material-icons\">search</md-icon>\n" +
    "                                                        Find Cause\n" +
    "                                                    </md-button>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </form>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div layout=\"row\" layout-padding ng-show=\"showPreview\" layout-align=\"center\">\n" +
    "                                    <div flex=\"90\" flex-offset=\"1\">\n" +
    "                                        <div layout-padding layout-align=\"start center\" style=\"min-height: 400px;\">\n" +
    "                                            <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"200\" ng-show=\"loading_embedly\" style=\"margin: 0 auto;\"></md-progress-circular>\n" +
    "                                            <embedly urlsearch=\"{{urlSearch}}\" onempty=\"tryAgain()\" ng-show=\"!loading_embedly\"></embedly>\n" +
    "                                            <md-toolbar class=\"md-accent\" ng-show=\"!loading_embedly\">\n" +
    "                                                <div class=\"md-toolbar-tools\">\n" +
    "                                                    <md-icon class=\"material-icons\">arrow_upward</md-icon>\n" +
    "                                                    <h2 style=\"margin-left:10px\">\n" +
    "                                                      <span>Does this look right?</span>\n" +
    "                                                    </h2>\n" +
    "                                                    <span flex></span>\n" +
    "                                                    <md-button class=\"md-primary md-raised\" ng-disabled=\"vm.showBusyText\" ng-click=\"vm.submitCurrentStep(vm.stepData[0])\" aria-label=\"Yep, let's move on!\">\n" +
    "                                                      Yep, let's move on!\n" +
    "                                                    </md-button>\n" +
    "                                                    <md-button class=\"md-accent md-hue-2 md-fab md-mini\" ng-disabled=\"vm.showBusyText\" ng-click=\"showUrlEducationDialog($event)\" aria-label=\"No, but why?\">\n" +
    "                                                      No\n" +
    "                                                    </md-button>\n" +
    "                                                  </div>\n" +
    "                                            </md-toolbar>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </md-step-body>\n" +
    "                    </md-step>\n" +
    "                    <md-step label=\"Customize\" md-complete=\"vm.stepData[1].data.completed\" ng-disabled=\"vm.stepProgress < 2\">\n" +
    "                        <md-step-body>\n" +
    "                            <div layout=\"row\" layout-align=\"center start\">\n" +
    "                                <div flex=\"50\" layout-padding layout-margin>\n" +
    "                                    <embedly urlsearch=\"{{urlSearch}}\" onempty=\"tryAgain()\"></embedly>\n" +
    "                                </div>\n" +
    "                                <div flex=\"50\" layout-padding layout-margin>\n" +
    "                                    <span class=\"md-title\">Let's customize this cause. (optional)</span>\n" +
    "                                    <form name=\"step2\">\n" +
    "                                        <md-input-container class=\"md-block\">\n" +
    "                                            <label>Title of cause</label>\n" +
    "                                            <!-- bind embedly title here -->\n" +
    "                                            <input name=\"title\" ng-model=\"vm.stepData[1].data.title\" required/>\n" +
    "                                            <div ng-messages=\"step2.title.$error\" role=\"alert\">\n" +
    "                                                <div ng-message-exp=\"['required']\">\n" +
    "                                                    Please add a title to this cause so we know what to call it.\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </md-input-container>\n" +
    "                                        <md-input-container class=\"md-block\">\n" +
    "                                            <label>Total Donation Amount</label>\n" +
    "                                            <!-- bind embedly price here, if it exists -->\n" +
    "                                            <input name=\"price\" ng-model=\"vm.stepData[1].data.price\" value=\"vm.stepData[1].data.price | number:2\" required />\n" +
    "                                            <div class=\"hint\">Taxes will be added to physical products during campaign creation. Shipping is free.</div>\n" +
    "                                            <div ng-messages=\"step2.price.$error\" role=\"alert\">\n" +
    "                                                <div ng-message-exp=\"['required']\">\n" +
    "                                                    Please add a donation price for this cause so we know how much to help you raise.\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </md-input-container>\n" +
    "                                        <p>Choose campaign image</p>\n" +
    "                                        <md-content layout=\"row\" layout-xs=\"column\" layout-align=\"start start\" layout-wrap>\n" +
    "                                                <md-card flex=\"20\">\n" +
    "                                                    <a href=\"javascript:;\" style=\"border: 1px solid blue\">\n" +
    "                                                        <img src=\"http://www.bloodworksnw.org/images/home/fuel-level-header.jpg\" class=\"md-card-image\" alt=\"\" />\n" +
    "                                                    </a>\n" +
    "                                                </md-card>\n" +
    "                                                <md-card flex=\"20\">\n" +
    "                                                    <a href=\"javascript:;\">\n" +
    "                                                        <img src=\"http://www.bloodworksnw.org/images/home/donate_blood.jpg\" class=\"md-card-image\" alt=\"\">\n" +
    "                                                    </a>\n" +
    "                                                </md-card>\n" +
    "                                                <md-card flex=\"20\">\n" +
    "                                                    <a href=\"javascript:;\">\n" +
    "                                                        <img src=\"http://www.bloodworksnw.org/images/home/be_a_volunteer.jpg\" class=\"md-card-image\" alt=\"\">\n" +
    "                                                    </a>\n" +
    "                                                </md-card>\n" +
    "                                                <md-card flex=\"20\">\n" +
    "                                                    <a href=\"javascript:;\">\n" +
    "                                                        <img src=\"http://www.bloodworksnw.org/images/home/donate_funds.jpg\" class=\"md-card-image\" alt=\"\">\n" +
    "                                                    </a>\n" +
    "                                                </md-card>\n" +
    "                                                <md-card flex=\"20\">\n" +
    "                                                    <a href=\"javascript:;\">\n" +
    "                                                        <img src=\"http://www.bloodworksnw.org/images/home/iam_bloodworks.jpg\" class=\"md-card-image\" alt=\"\">\n" +
    "                                                    </a>\n" +
    "                                                </md-card>\n" +
    "                                        </md-content>\n" +
    "                                        <md-content class=\"filestack-container\" layout-padding>\n" +
    "                                            <input id=\"filestack-widget\" filepicker data-fp-apikey=\"AVdh2bvkuTYKQI3rdMsZXz\" type=\"filepicker-dragdrop\" data-fp-services=\"computer,url,facebook,webcam,dropbox\" on-success=\"SetUploadedImage(event.fpfile)\" />\n" +
    "                                        </md-content>\n" +
    "                                    </form>\n" +
    "                                    <div flex>\n" +
    "                                        <md-button ng-click=\"vm.moveToPreviousStep()\">Go back</md-button>\n" +
    "                                        <md-button type=\"submit\" ng-disabled=\"vm.showBusyText\" ng-click=\"vm.submitCurrentStep(vm.stepData[1], true)\" class=\"md-primary md-raised\">Perfect, let's finish!</md-button>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </md-step-body>\n" +
    "                    </md-step>\n" +
    "                    <md-step label=\"Finish\" md-complete=\"vm.stepData[2].data.completed\" ng-disabled=\"vm.stepProgress < 3\">\n" +
    "                        <md-step-body>\n" +
    "                            <div layout=\"row\" layout-align=\"center center\">\n" +
    "                                <div flex=\"30\" style=\"text-align: center;\">\n" +
    "                                    <h4 class=\"md-title\">That's it! Now, create your campaign.</h4>\n" +
    "                                    <md-input-container class=\"md-block\">\n" +
    "                                        <md-button class=\"md-raised md-primary\">Click Here To Create Your Campaign</md-button>\n" +
    "                                    </md-input-container>\n" +
    "                                    <small>Or, click this link and copy/paste into a new browser tab.</small>\n" +
    "                                    <md-input-container>\n" +
    "                                        <!-- Bind shortened bitly link here -->\n" +
    "                                        <input name=\"short_link\" ng-model=\"campaignCreateShortLink\" md-select-on-focus ng-readonly=\"true\" />\n" +
    "                                    </md-input-container>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <md-step-actions layout=\"row\" layout-padding>\n" +
    "                                <div flex layout=\"row\" layout-align=\"start top\">\n" +
    "                                    <md-button ng-click=\"vm.moveToPreviousStep()\">Go Back</md-button>\n" +
    "                                </div>\n" +
    "                                <div flex layout=\"row\" layout-align=\"end top\">\n" +
    "                                    <md-button class=\"md-warn\" ng-click=\"vm.moveToPreviousStep()\">\n" +
    "                                        Start Over\n" +
    "                                        <md-tooltip md-direction=\"left\">\n" +
    "                                            Starting over will lose current progress.\n" +
    "                                        </md-tooltip>\n" +
    "                                    </md-button>\n" +
    "                                </div>\n" +
    "                            </md-step-actions>\n" +
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
    "            <md-list-item ng-repeat=\"item in vm.admin\" ng-click=\"vm.showSettingsBottom($event)\" ng-hide=\"item.hide\">\n" +
    "                <div class=\"inset\" ng-hide=\"item.hide\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.title }}</p>\n" +
    "            </md-list-item>\n" +
    "        </md-list>\n"
  );


  $templateCache.put('app/modules/shared/directives/bitly/bitly.html',
    "<div><a href=\"{{UrlToBitlify}}\" bitly-generator>{{TheTitle}}</a></div>\n"
  );


  $templateCache.put('app/modules/shared/directives/embedly/embedly.html',
    "<md-card ng-show=\"!loading_embedly\">\n" +
    "    <md-card-header>\n" +
    "        <md-card-avatar>\n" +
    "            <img ng-src=\"{{embedCode.favicon_url}}\" alt=\"{{embedCode.provider_name}}\"/>\n" +
    "        </md-card-avatar>\n" +
    "        <md-card-header-text>\n" +
    "            <span class=\"md-title\">{{embedCode.provider_name}}</span>\n" +
    "            <span class=\"md-subhead\">{{embedCode.provider_display}}</span>\n" +
    "        </md-card-header-text>\n" +
    "    </md-card-header>\n" +
    "    <img ng-src=\"{{embedCode.images[0].url}}\" class=\"md-card-image\" alt=\"{{embedCode.title}}\">\n" +
    "    <md-card-title>\n" +
    "        <md-card-title-text>\n" +
    "            <span class=\"md-headline\">{{embedCode.title}}</span>\n" +
    "        </md-card-title-text>\n" +
    "    </md-card-title>\n" +
    "    <md-card-content ng-hide=\"!embedCode.description\">\n" +
    "        <p>\n" +
    "            {{embedCode.description}}\n" +
    "        </p>\n" +
    "    </md-card-content>\n" +
    "</md-card>"
  );


  $templateCache.put('app/modules/shared/directives/linkcreator/linkcreator.html',
    "<div><!-- Template Contente if you use templateUrl --></div>\n"
  );


  $templateCache.put('app/modules/usersync/usersync.html',
    "<div class=\"md-padding\" flex layout-sm=\"column\">\n" +
    "    <md-card>\n" +
    "        <md-card-content>\n" +
    "            <h2 class=\"md-title\">Content from: usersync page</h2>\n" +
    "             <div ng-controller=\"UsersyncCtrl\">\n" +
    "                <ul>\n" +
    "                    <li ng-repeat=\"user in users\" >\n" +
    "                        <p>{{user.Name.GivenName}} {{user.Name.FamilyName}}</p>\n" +
    "                        <em-embed urlsearch=\"{{user.profileImg}}\"></em-embed>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n"
  );

}]);
