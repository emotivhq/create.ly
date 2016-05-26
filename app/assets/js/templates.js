angular.module('gsConcierge').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/create/create.1.html',
    "<div layout=\"row\" layout-margin layout=\"column\" data-ng-controller=\"CreateCtrl\" bind-embedly ng-cloak class=\"create\">\n" +
    "    <div flex>\n" +
    "        <md-card>\n" +
    "            <md-toolbar>\n" +
    "                <div class=\"md-toolbar-tools\">\n" +
    "                    <h2>Create a non-profit campaign</h2>\n" +
    "                </div>\n" +
    "            </md-toolbar>\n" +
    "            <md-stepper-card-content class=\"md-no-padding\">\n" +
    "                <md-steppers md-dynamic-height md-stretch-steppers=\"always\" md-selected=\"vm.selectedStep\" md-busy-text=\"'Fetching data & other things...'\" md-busy=\"vm.showBusyText\">\n" +
    "                    <md-step label=\"Enter Url\" md-complete=\"vm.stepData[0].completed\" ng-disabled=\"vm.stepProgress < 1\">\n" +
    "                        <section data-ng-include=\" 'app/modules/create/steps/url.html' \"></section>\n" +
    "                    </md-step>\n" +
    "                    <md-step label=\"Customize\" md-complete=\"vm.stepData[1].completed\" ng-disabled=\"vm.stepProgress < 2\">\n" +
    "                        <section data-ng-include=\" 'app/modules/create/steps/customize.html' \"></section>\n" +
    "                    </md-step>\n" +
    "                    <md-step label=\"Finish\" md-complete=\"vm.stepData[2].completed\" ng-disabled=\"vm.stepProgress < 3\">\n" +
    "                        <section data-ng-include=\" 'app/modules/create/steps/finish.html' \"></section>\n" +
    "                    </md-step>\n" +
    "                </md-steppers>\n" +
    "            </md-stepper-card-content>\n" +
    "        </md-card>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/create/create.html',
    "<div layout=\"row\" layout-margin layout=\"column\" data-ng-controller=\"CreateCtrl\" bind-embedly ng-cloak class=\"create\">\n" +
    "    <div flex>\n" +
    "        <md-card>\n" +
    "            <md-toolbar>\n" +
    "                <div class=\"md-toolbar-tools\">\n" +
    "                    <h2>Create a non-profit campaign</h2>\n" +
    "                </div>\n" +
    "            </md-toolbar>\n" +
    "            <md-stepper-card-content class=\"md-no-padding\">\n" +
    "                <md-steppers md-dynamic-height md-stretch-steppers=\"always\" md-selected=\"vm.selectedStep\" md-busy-text=\"'Fetching data & other things...'\" md-busy=\"vm.showBusyText\">\n" +
    "                    <md-step label=\"Enter Url\" md-complete=\"vm.stepData[0].completed\" ng-disabled=\"vm.stepProgress < 1\">\n" +
    "                        <md-step-body>\n" +
    "                            <div layout=\"column\">\n" +
    "                                <div layout=\"row\" layout-padding layout-align=\"center start\" layout-wrap>\n" +
    "                                    <div flex=\"90\" flex-sm=\"90\" flex-xs=\"100\">\n" +
    "                                        <span class=\"md-title\">\n" +
    "                                            Paste any non-profit url\n" +
    "                                        </span>\n" +
    "                                        <form name=\"step1\" ng-submit=\"vm.getUrlInfo(vm.stepData[0].data.product_url)\">\n" +
    "                                            <div layout=\"row\" layout-xs=\"column\" flex>\n" +
    "                                                <md-input-container flex class=\"md-block\">\n" +
    "                                                    <input name=\"product_url\" ng-model=\"vm.stepData[0].data.product_url\" ng-disabled=\"vm.showBusyText\" md-select-on-focus ng-pattern=\"vm.urlPattern\" ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 300, blur: 300 } }\" required aria-label=\"Enter Url\"/>\n" +
    "                                                    <div class=\"hint\" ng-show=\"vm.showProductUrlHint\">{{vm.productUrlHint}}</div>\n" +
    "                                                    <div ng-messages=\"step1.product_url.$error\" role=\"alert\">\n" +
    "                                                        <div ng-message-exp=\"['required','pattern']\">\n" +
    "                                                            That doesn't look like a valid url... are you sure you pasted the right thing?\n" +
    "                                                        </div>\n" +
    "                                                    </div>\n" +
    "                                                </md-input-container>\n" +
    "                                                <div>\n" +
    "                                                    <md-button type=\"submit\" class=\"md-raised\" ng-disabled=\"!vm.stepData[0].data.product_url || loading_embedly || vm.showBusyText\" aria-label=\"Get URL Info\"  ng-click=\"vm.getUrlInfo(vm.stepData[0].data.product_url)\">\n" +
    "                                                        <md-icon class=\"material-icons\">search</md-icon>\n" +
    "                                                        Find Cause\n" +
    "                                                    </md-button>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </form>\n" +
    "                                        <md-progress-linear md-mode=\"indeterminate\" ng-show=\"loading_embedly\"></md-progress-linear>\n" +
    "                                    </div>\n" +
    "                                    <div flex=\"90\" flex-sm=\"90\" flex-xs=\"100\">\n" +
    "                                        <div ng-show=\"showPreview\">\n" +
    "                                            <embedly urlsearch=\"{{vm.urlSearch}}\" onempty=\"tryAgain()\"></embedly>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <md-step-actions layout=\"row\" layout-padding>\n" +
    "                                 <div flex layout=\"row\" layout-align=\"start top\">\n" +
    "                                    <md-button ng-hide=\"vm.showBusyText || loading_embedly || !showPreview\" ng-disabled=\"vm.showBusyText || loading_embedly || !showPreview\" ng-click=\"vm.showUrlEducationDialog($event)\">\n" +
    "                                        <md-icon md-svg-icon=\"md-toggle-arrow\"></md-icon> This doesn't look right\n" +
    "                                         <md-tooltip md-direction=\"left\">\n" +
    "                                            Did you expect a different site?\n" +
    "                                        </md-tooltip>\n" +
    "                                    </md-button>\n" +
    "                                </div>\n" +
    "                                <div flex layout=\"row\" layout-align=\"end top\">\n" +
    "                                    <md-button class=\"md-primary md-raised\" ng-hide=\"vm.showBusyText || loading_embedly || !showPreview\" ng-disabled=\"vm.showBusyText || loading_embedly || !showPreview\" ng-click=\"vm.submitCurrentStep(vm.stepData[0])\">\n" +
    "                                        That's it<span hide-xs>, let's move on</span>\n" +
    "                                    </md-button>\n" +
    "                                </div>\n" +
    "                            </md-step-actions>\n" +
    "                        </md-step-body>\n" +
    "                    </md-step>\n" +
    "                    <md-step label=\"Customize\" md-complete=\"vm.stepData[1].completed\" ng-disabled=\"vm.stepProgress < 2\">\n" +
    "                        <md-step-body>\n" +
    "                            <div layout=\"column\" layout-gt-sm=\"row\" layout-align=\"center start\">\n" +
    "                                <div flex=\"100\" flex-gt-sm=\"50\" flex-order=\"1\" flex-order-gt-sm=\"0\" layout-padding>\n" +
    "                                    <embedly urlsearch=\"{{vm.urlSearch}}\"></embedly>\n" +
    "                                </div>\n" +
    "                                <div flex=\"100\" flex-gt-sm=\"50\" flex-order=\"0\" flex-order-gt-sm=\"1\" layout-padding layout-margin>\n" +
    "                                    <span class=\"md-title\">Customize your cause.</span>\n" +
    "                                    <form name=\"step2\">\n" +
    "                                        <md-input-container class=\"md-icon-float md-block\">\n" +
    "                                            <label>Title of cause</label>\n" +
    "                                            <md-icon class=\"material-icons\">font_download</md-icon>\n" +
    "                                            <input name=\"title\" class=\"cause-title\" required ng-model=\"cardTitle\" aria-label=\"Title of cause\" />\n" +
    "                                            <div ng-messages=\"step2.title.$error\" role=\"alert\">\n" +
    "                                                <div ng-message-exp=\"['required']\">\n" +
    "                                                    Please add a title to your cause so we know what to call it.\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </md-input-container>\n" +
    "                                        <md-input-container class=\"md-icon-float md-block\">\n" +
    "                                            <label>Total Donation Amount</label>\n" +
    "                                            <md-icon class=\"material-icons\">attach_money</md-icon>\n" +
    "                                            <input name=\"price\" type=\"number\" ng-model=\"vm.stepData[1].data.price\" required aria-label=\"Total donation amount\" />\n" +
    "                                            <div class=\"hint\">Taxes will be added to physical products during campaign creation. Shipping is free.</div>\n" +
    "                                            <div ng-messages=\"step2.price.$error\" role=\"alert\">\n" +
    "                                                <div ng-message-exp=\"['required']\">\n" +
    "                                                    Please add a donation price for your cause so we know how much to help you raise.\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </md-input-container>\n" +
    "                                        <md-content>\n" +
    "                                            <p>Choose a campaign image</p>\n" +
    "                                            <hr/>\n" +
    "                                            <div layout=\"row\" layout-xs=\"column\" layout-align=\"start start\" layout-wrap>\n" +
    "                                                <md-card flex=\"20\" ng-repeat=\"image in embedlyImages track by $index\">\n" +
    "                                                    <img class=\"md-whiteframe-6dp embedly-variation-images\" ng-src=\"{{ image.url }}\" alt=\"{{ image.caption}}\" style=\"cursor:pointer;\" />\n" +
    "                                                </md-card>\n" +
    "                                            </div>\n" +
    "                                        </md-content>\n" +
    "                                        <p>Or, upload a custom image</p>\n" +
    "                                        <md-content class=\"filestack-container\" layout-padding>\n" +
    "                                            <input id=\"filestack-widget\" filepicker ng-model=\"vm.stepData[1].data.cardImg\" data-fp-apikey=\"AVdh2bvkuTYKQI3rdMsZXz\" type=\"filepicker-dragdrop\" data-fp-conversions=\"crop,rotate,filter\" data-fp-cropRatio=\"4/3\" data-fp-cropDim=\"1024, 1024\" data-fp-cropMax=\"1920, 1920\" data-fp-services=\"computer,url,webcam,video,gmail,facebook,instagram,twitter,box,dropbox,googledrive,convert\" on-success=\"setUploadedImage(event.fpfile)\" />\n" +
    "                                        </md-content>\n" +
    "                                    </form>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <md-step-actions layout=\"row\" layout-padding>\n" +
    "                                 <div flex layout=\"row\" layout-align=\"start top\">\n" +
    "                                    <md-button ng-disabled=\"vm.showBusyText\" ng-click=\"vm.moveToPreviousStep()\">\n" +
    "                                        <md-icon md-svg-icon=\"md-toggle-chevron-left\"></md-icon> Go back\n" +
    "                                         <md-tooltip md-direction=\"left\">\n" +
    "                                            Did you change your mind?\n" +
    "                                        </md-tooltip>\n" +
    "                                    </md-button>\n" +
    "                                </div>\n" +
    "                                <div flex layout=\"row\" layout-align=\"end top\">\n" +
    "                                    <md-button class=\"md-primary md-raised\" ng-disabled=\"vm.showBusyText || !vm.stepData[1].data.price\" ng-click=\"vm.submitCurrentStep(vm.stepData[1], true)\">\n" +
    "                                        All set<span hide-xs>, let's finish</span>\n" +
    "                                    </md-button>\n" +
    "                                </div>\n" +
    "                            </md-step-actions>\n" +
    "                        </md-step-body>\n" +
    "                    </md-step>\n" +
    "                    <md-step label=\"Finish\" md-complete=\"vm.stepData[2].completed\" ng-disabled=\"vm.stepProgress < 3\">\n" +
    "                        <md-step-body>\n" +
    "                            <div layout=\"column\" layout-gt-sm=\"row\" layout-align=\"center start\">\n" +
    "                                <div flex=\"100\" flex-gt-sm=\"50\" flex-order=\"1\" flex-order-gt-sm=\"0\" layout-padding>\n" +
    "                                    <!-- TODO: @yaboi\n" +
    "                                        allow ability to update ng-src for this to work,\n" +
    "                                        then add to step 2 as well instead of embedly directive\n" +
    "                                    -->\n" +
    "                                    <md-card>\n" +
    "                                        <md-card-header ng-show=\"faviconUrl || providerName || providerDisplay\">\n" +
    "                                            <md-card-avatar ng-show=\"faviconUrl\">\n" +
    "                                                <img ng-src=\"{{faviconUrl}}\" alt=\"{{providerName}}\" />\n" +
    "                                            </md-card-avatar>\n" +
    "                                            <md-card-header-text>\n" +
    "                                                <span class=\"md-title\" ng-show=\"providerName\">{{providerName}}</span>\n" +
    "                                                <span class=\"md-subhead\" ng-show=\"providerDisplay\">\n" +
    "                                                    <span hide-xs>See more at </span>{{providerDisplay}}\n" +
    "                                                </span>\n" +
    "                                            </md-card-header-text>\n" +
    "                                        </md-card-header>\n" +
    "                                        <img ng-src=\"{{cardImg}}\" class=\"md-card-image\" alt=\"{{cardTitle}}\" ng-show=\"cardImg\">\n" +
    "                                        <md-card-title ng-show=\"cardTitle\">\n" +
    "                                            <md-card-title-text>\n" +
    "                                                <span class=\"md-headline\">{{cardTitle}}</span>\n" +
    "                                            </md-card-title-text>\n" +
    "                                        </md-card-title>\n" +
    "                                        <md-card-content ng-show=\"cardDescription\">\n" +
    "                                            <p>\n" +
    "                                                {{cardDescription}}\n" +
    "                                            </p>\n" +
    "                                        </md-card-content>\n" +
    "                                    </md-card>\n" +
    "                                </div>\n" +
    "                                <div flex=\"100\" flex-gt-sm=\"50\" flex-order=\"0\" flex-order-gt-sm=\"1\" layout-padding layout-margin>\n" +
    "                                    <md-button flex style=\"width:100%\" flex=\"100\" class=\"md-primary md-raised md-hue-2\" ng-disabled=\"vm.showBusyText\" ng-click=\"vm.startCampaignFromLink()\" aria-label=\"Create campaign now\">\n" +
    "                                        <md-icon class=\"material-icons\">open_in_new</md-icon>\n" +
    "                                        Create <span hide-xs>this campaign</span> now\n" +
    "                                        <md-tooltip md-direction=\"bottom\">\n" +
    "                                            If you're ready now, let's do this.\n" +
    "                                        </md-tooltip>\n" +
    "                                    </md-button>\n" +
    "                                    <md-divider></md-divider>\n" +
    "                                    <span class=\"md-title\">Or, copy/paste the link below for later</span>\n" +
    "                                    <div layout=\"row\" layout-xs=\"column\" flex>\n" +
    "                                        <md-input-container flex class=\"md-block\">\n" +
    "                                            <input id=\"shortLink\" ng-model=\"vm.campaignCreateShortLink\" md-select-on-focus ng-readonly=\"true\" aria-label=\"Campaign Short Link\" />\n" +
    "                                        </md-input-container>\n" +
    "                                        <div>\n" +
    "                                            <md-button ng-show=\"!vm.showClipboardTooltip && !vm.showFallbackClipboardTooltip\" type=\"button\" class=\"md-raised\" aria-label=\"Copy URL\" ngclipboard data-clipboard-target=\"#shortLink\" ngclipboard-success=\"vm.clipboardCopySuccess($event);\" ngclipboard-error=\"vm.clipboardCopyError($event);\">\n" +
    "                                                <md-icon class=\"material-icons\">content_copy</md-icon>\n" +
    "                                                Copy Url\n" +
    "                                            </md-button>\n" +
    "                                            <md-button ng-show=\"vm.showClipboardTooltip || vm.showFallbackClipboardTooltip\" type=\"button\" class=\"md-raised md-accent md-hue-3\" aria-label=\"URL copied\" ngclipboard data-clipboard-target=\"#shortLink\" ngclipboard-success=\"vm.clipboardCopySuccess($event);\" ngclipboard-error=\"vm.clipboardCopyError($event);\">\n" +
    "                                                <span ng-show=\"vm.showClipboardTooltip\">\n" +
    "                                                    <md-icon class=\"material-icons\">done</md-icon>\n" +
    "                                                    Url copied\n" +
    "                                                </span>\n" +
    "                                                <span ng-show=\"vm.showFallbackClipboardTooltip\">\n" +
    "                                                    <md-icon class=\"material-icons\">done</md-icon>\n" +
    "                                                    Press Ctrl+C\n" +
    "                                                </span>\n" +
    "                                            </md-button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <md-step-actions layout=\"row\" layout-padding>\n" +
    "                                <div flex layout=\"row\" layout-align=\"start top\">\n" +
    "                                    <md-button ng-click=\"vm.moveToPreviousStep()\">Go Back</md-button>\n" +
    "                                </div>\n" +
    "                                <div flex layout=\"row\" layout-align=\"end top\">\n" +
    "                                    <md-button class=\"md-warn\" ng-click=\"vm.clearStepper()\">\n" +
    "                                        Start Over\n" +
    "                                        <md-tooltip md-direction=\"top\">\n" +
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
    "</div>\n"
  );


  $templateCache.put('app/modules/create/steps/actions/url.html',
    "                            <md-step-actions layout=\"row\" layout-padding>\n" +
    "                                <div flex layout=\"row\" layout-align=\"start top\">\n" +
    "                                    <md-button ng-disabled=\"vm.showBusyText || loading_embedly || !showPreview\" ng-click=\"vm.showUrlEducationDialog($event)\">\n" +
    "                                        No\n" +
    "                                        <md-tooltip md-direction=\"left\">\n" +
    "                                            No, but why? Let's try another URL.\n" +
    "                                        </md-tooltip>\n" +
    "                                    </md-button>\n" +
    "                                </div>\n" +
    "                                <div flex layout=\"row\" layout-align=\"end top\">\n" +
    "                                    <md-button class=\"md-warn\" ng-disabled=\"vm.showBusyText || loading_embedly || !showPreview\" ng-click=\"vm.submitCurrentStep(vm.stepData[0])\">\n" +
    "                                        Yes<span hide-xs>, let's move on!</span>\n" +
    "                                    </md-button>\n" +
    "                                </div>\n" +
    "                                <md-card-icon-actions>\n" +
    "                                    <md-button class=\"md-icon-button\" aria-label=\"Does this look right?\">\n" +
    "                                        <md-icon md-svg-icon=\"md-toggle-arrow\">\n" +
    "                                         <md-tooltip md-direction=\"left\">\n" +
    "                                            Does this look right?\n" +
    "                                        </md-tooltip>\n" +
    "                                        </md-icon>\n" +
    "                                    </md-button>\n" +
    "                                </md-card-icon-actions>\n" +
    "                            </md-step-actions>\n"
  );


  $templateCache.put('app/modules/create/steps/customize.html',
    "                        <md-step-body>\n" +
    "                            <div layout=\"column\" layout-gt-sm=\"row\" layout-align=\"center start\">\n" +
    "                                <div flex=\"100\" flex-gt-sm=\"50\" flex-order=\"1\" flex-order-gt-sm=\"0\" layout-padding>\n" +
    "                                    <embedly urlsearch=\"{{vm.urlSearch}}\"></embedly>\n" +
    "                                </div>\n" +
    "                                <div flex=\"100\" flex-gt-sm=\"50\" flex-order=\"0\" flex-order-gt-sm=\"1\" layout-padding layout-margin>\n" +
    "                                    <span class=\"md-title\">Customize your cause.</span>\n" +
    "                                    <form name=\"step2\">\n" +
    "                                        <md-input-container class=\"md-icon-float md-block\">\n" +
    "                                            <label>Title of cause</label>\n" +
    "                                            <md-icon class=\"material-icons\">font_download</md-icon>\n" +
    "                                            <input name=\"title\" class=\"cause-title\" required ng-model=\"cardTitle\" aria-label=\"Title of cause\" />\n" +
    "                                            <div ng-messages=\"step2.title.$error\" role=\"alert\">\n" +
    "                                                <div ng-message-exp=\"['required']\">\n" +
    "                                                    Please add a title to your cause so we know what to call it.\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </md-input-container>\n" +
    "                                        <md-input-container class=\"md-icon-float md-block\">\n" +
    "                                            <label>Total Donation Amount</label>\n" +
    "                                            <md-icon class=\"material-icons\">attach_money</md-icon>\n" +
    "                                            <input name=\"price\" type=\"number\" ng-model=\"vm.stepData[1].data.price\" required aria-label=\"Total donation amount\" />\n" +
    "                                            <div class=\"hint\">Taxes will be added to physical products during campaign creation. Shipping is free.</div>\n" +
    "                                            <div ng-messages=\"step2.price.$error\" role=\"alert\">\n" +
    "                                                <div ng-message-exp=\"['required']\">\n" +
    "                                                    Please add a donation price for your cause so we know how much to help you raise.\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </md-input-container>\n" +
    "                                        <md-content>\n" +
    "                                            <p>Choose campaign image</p>\n" +
    "                                            <hr/>\n" +
    "                                            <div layout=\"row\" layout-xs=\"column\" layout-align=\"start start\" layout-wrap>\n" +
    "                                                <md-card flex=\"20\" ng-repeat=\"image in embedlyImages track by $index\">\n" +
    "                                                    <img class=\"embedly-variation-images\" ng-src=\"{{ image.url }}\" alt=\"{{ image.caption}}\" />\n" +
    "                                                </md-card>\n" +
    "                                            </div>\n" +
    "                                        </md-content>\n" +
    "                                        <p>Upload custom campaign image <em>(optional)</em></p>\n" +
    "                                        <md-content class=\"filestack-container\" layout-padding>\n" +
    "                                            <input id=\"filestack-widget\" filepicker ng-model=\"vm.stepData[1].data.cardImg\" data-fp-apikey=\"AVdh2bvkuTYKQI3rdMsZXz\" type=\"filepicker-dragdrop\" data-fp-conversions=\"crop,rotate,filter\" data-fp-cropRatio=\"4/3\" data-fp-cropDim=\"1024, 1024\" data-fp-cropMax=\"1920, 1920\" data-fp-services=\"computer,url,webcam,video,gmail,facebook,instagram,twitter,box,dropbox,googledrive,convert\" on-success=\"setUploadedImage(event.fpfile)\" />\n" +
    "                                        </md-content>\n" +
    "                                        <md-input-container class=\"md-block\">\n" +
    "                                              <label>Or paste image URL </label>\n" +
    "                                              <input name=\"imageurl\" class=\"cause-img\" ng-model=\"cardImg\" />\n" +
    "                                        </md-input-container>\n" +
    "                                    </form>\n" +
    "                                    <div flex>\n" +
    "                                        <md-toolbar class=\"md-accent\" ng-show=\"!loading_embedly\">\n" +
    "                                            <div class=\"md-toolbar-tools\">\n" +
    "                                                <h2 style=\"margin-left:10px\">\n" +
    "                                                  <span>All set?</span>\n" +
    "                                                </h2>\n" +
    "                                                <span flex></span>\n" +
    "                                                <md-button class=\"md-primary md-raised\" ng-disabled=\"vm.showBusyText\" ng-click=\"vm.submitCurrentStep(vm.stepData[1], true)\" aria-label=\"Perfect, let's finish!\">\n" +
    "                                                  Perfect, let's finish!\n" +
    "                                                </md-button>\n" +
    "                                                <md-button class=\"md-accent md-hue-2 md-fab md-mini\" ng-disabled=\"vm.showBusyText\" ng-click=\"vm.moveToPreviousStep()\" aria-label=\"No, let's go back\">\n" +
    "                                                  No\n" +
    "                                                </md-button>\n" +
    "                                              </div>\n" +
    "                                        </md-toolbar>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </md-step-body>\n"
  );


  $templateCache.put('app/modules/create/steps/finish.html',
    "                        <md-step-body>\n" +
    "                            <div layout=\"column\" layout-gt-sm=\"row\" layout-align=\"center start\">\n" +
    "                                <div flex=\"100\" flex-gt-sm=\"50\" flex-order=\"1\" flex-order-gt-sm=\"0\" layout-padding>\n" +
    "                                    <!-- TODO: @yaboi\n" +
    "                                        allow ability to update ng-src for this to work,\n" +
    "                                        then add to step 2 as well instead of embedly directive\n" +
    "                                    -->\n" +
    "                                    <md-card>\n" +
    "                                        <md-card-header ng-show=\"faviconUrl || providerName || providerDisplay\">\n" +
    "                                            <md-card-avatar ng-show=\"faviconUrl\">\n" +
    "                                                <img ng-src=\"{{faviconUrl}}\" alt=\"{{providerName}}\" />\n" +
    "                                            </md-card-avatar>\n" +
    "                                            <md-card-header-text>\n" +
    "                                                <span class=\"md-title\" ng-show=\"providerName\">{{providerName}}</span>\n" +
    "                                                <span class=\"md-subhead\" ng-show=\"providerDisplay\">\n" +
    "                                                    <span hide-xs>See more at </span>{{providerDisplay}}\n" +
    "                                                </span>\n" +
    "                                            </md-card-header-text>\n" +
    "                                        </md-card-header>\n" +
    "                                        <img ng-src=\"{{cardImg}}\" class=\"md-card-image\" alt=\"{{cardTitle}}\" ng-show=\"cardImg\">\n" +
    "                                        <md-card-title ng-show=\"cardTitle\">\n" +
    "                                            <md-card-title-text>\n" +
    "                                                <span class=\"md-headline\">{{cardTitle}}</span>\n" +
    "                                            </md-card-title-text>\n" +
    "                                        </md-card-title>\n" +
    "                                        <md-card-content ng-show=\"cardDescription\">\n" +
    "                                            <p>\n" +
    "                                                {{cardDescription}}\n" +
    "                                            </p>\n" +
    "                                        </md-card-content>\n" +
    "                                    </md-card>\n" +
    "                                </div>\n" +
    "                                <div flex=\"100\" flex-gt-sm=\"50\" flex-order=\"0\" flex-order-gt-sm=\"1\" layout-padding layout-margin>\n" +
    "                                    <md-toolbar class=\"md-accent md-hue-1\">\n" +
    "                                        <div class=\"md-toolbar-tools\">\n" +
    "                                            <md-icon class=\"material-icons\" hide-xs style=\"margin-right:10px\">trending_flat</md-icon>\n" +
    "                                            <h2 hide-xs hide-sm>Want to create this campaign now?</h2>\n" +
    "                                            <h2 hide-md hide-lg hide-xl>Create campaign now?</h2>\n" +
    "                                            <span flex></span>\n" +
    "                                            <md-button class=\"md-primary md-raised md-hue-2\" ng-disabled=\"vm.showBusyText\" ng-click=\"vm.startCampaignFromLink()\" aria-label=\"Yes, create now!\">\n" +
    "                                                <md-icon class=\"material-icons\">open_in_new</md-icon>\n" +
    "                                                Yes<span hide-xs>, create now!</span>\n" +
    "                                            </md-button>\n" +
    "                                        </div>\n" +
    "                                    </md-toolbar>\n" +
    "                                    <span class=\"md-title\">Copy/paste the link below into a new tab</span>\n" +
    "                                    <div layout=\"row\" layout-xs=\"column\" flex>\n" +
    "                                        <md-input-container flex class=\"md-block\">\n" +
    "                                            <input id=\"shortLink\" ng-model=\"vm.campaignCreateShortLink\" md-select-on-focus ng-readonly=\"true\" aria-label=\"Campaign Short Link\" />\n" +
    "                                        </md-input-container>\n" +
    "                                        <div>\n" +
    "                                            <md-button ng-show=\"!vm.showClipboardTooltip && !vm.showFallbackClipboardTooltip\" type=\"button\" class=\"md-raised\" aria-label=\"Copy URL\" ngclipboard data-clipboard-target=\"#shortLink\" ngclipboard-success=\"vm.clipboardCopySuccess($event);\" ngclipboard-error=\"vm.clipboardCopyError($event);\">\n" +
    "                                                <md-icon class=\"material-icons\">content_copy</md-icon>\n" +
    "                                                Copy Url\n" +
    "                                            </md-button>\n" +
    "                                            <md-button ng-show=\"vm.showClipboardTooltip || vm.showFallbackClipboardTooltip\" type=\"button\" class=\"md-raised md-accent md-hue-3\" aria-label=\"URL Copied!\" ngclipboard data-clipboard-target=\"#shortLink\" ngclipboard-success=\"vm.clipboardCopySuccess($event);\" ngclipboard-error=\"vm.clipboardCopyError($event);\">\n" +
    "                                                <span ng-show=\"vm.showClipboardTooltip\">\n" +
    "                                                    <md-icon class=\"material-icons\">done</md-icon>\n" +
    "                                                    Url Copied!\n" +
    "                                                </span>\n" +
    "                                                <span ng-show=\"vm.showFallbackClipboardTooltip\">\n" +
    "                                                    <md-icon class=\"material-icons\">done</md-icon>\n" +
    "                                                    Press Ctrl+C\n" +
    "                                                </span>\n" +
    "                                            </md-button>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <md-step-actions layout=\"row\" layout-padding>\n" +
    "                                <div flex layout=\"row\" layout-align=\"start top\">\n" +
    "                                    <md-button ng-click=\"vm.moveToPreviousStep()\">Go Back</md-button>\n" +
    "                                </div>\n" +
    "                                <div flex layout=\"row\" layout-align=\"end top\">\n" +
    "                                    <md-button class=\"md-warn\" ng-click=\"vm.clearStepper()\">\n" +
    "                                        Start Over\n" +
    "                                        <md-tooltip md-direction=\"left\">\n" +
    "                                            Starting over will lose current progress.\n" +
    "                                        </md-tooltip>\n" +
    "                                    </md-button>\n" +
    "                                </div>\n" +
    "                            </md-step-actions>\n" +
    "                        </md-step-body>\n"
  );


  $templateCache.put('app/modules/create/steps/url.html',
    "                        <md-step-body>\n" +
    "                            <div layout=\"column\">\n" +
    "                                <div layout=\"row\" layout-padding layout-align=\"center start\" layout-wrap>\n" +
    "                                    <div flex=\"90\" flex-sm=\"90\" flex-xs=\"100\">\n" +
    "                                        <span class=\"md-title\">\n" +
    "                                            Paste any non-profit url\n" +
    "                                        </span>\n" +
    "                                        <form name=\"step1\" ng-submit=\"vm.getUrlInfo(vm.stepData[0].data.product_url)\">\n" +
    "                                            <div layout=\"row\" layout-xs=\"column\" flex>\n" +
    "                                                <md-input-container flex class=\"md-block\">\n" +
    "                                                    <input name=\"product_url\" ng-model=\"vm.stepData[0].data.product_url\" ng-disabled=\"vm.showBusyText\" md-select-on-focus ng-pattern=\"vm.urlPattern\" ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 300, blur: 300 } }\" required aria-label=\"Enter Url\"/>\n" +
    "                                                    <div class=\"hint\" ng-show=\"vm.showProductUrlHint\">{{vm.productUrlHint}}</div>\n" +
    "                                                    <div ng-messages=\"step1.product_url.$error\" role=\"alert\">\n" +
    "                                                        <div ng-message-exp=\"['required','pattern']\">\n" +
    "                                                            That doesn't look like a valid url... are you sure you pasted the right thing?\n" +
    "                                                        </div>\n" +
    "                                                    </div>\n" +
    "                                                </md-input-container>\n" +
    "                                                <div>\n" +
    "                                                    <md-button type=\"submit\" class=\"md-raised\" ng-disabled=\"!vm.stepData[0].data.product_url || loading_embedly || vm.showBusyText\" aria-label=\"Get URL Info\"  ng-click=\"vm.getUrlInfo(vm.stepData[0].data.product_url)\">\n" +
    "                                                        <md-icon class=\"material-icons\">search</md-icon>\n" +
    "                                                        Find Cause\n" +
    "                                                    </md-button>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </form>\n" +
    "                                        <md-progress-linear md-mode=\"indeterminate\" ng-show=\"loading_embedly\"></md-progress-linear>\n" +
    "                                    </div>\n" +
    "                                    <div flex=\"60\" flex-sm=\"90\" flex-xs=\"100\">\n" +
    "                                        <div ng-show=\"showPreview\">\n" +
    "                                            <embedly urlsearch=\"{{vm.urlSearch}}\" onempty=\"tryAgain()\"></embedly>\n" +
    "                                            <md-toolbar class=\"md-accent\">\n" +
    "                                                <div class=\"md-toolbar-tools\">\n" +
    "                                                    <md-icon class=\"material-icons\" hide-xs style=\"margin-right:10px\">arrow_upward</md-icon>\n" +
    "                                                    <h2>Does this look right?</h2>\n" +
    "                                                    <span flex></span>\n" +
    "                                                    <md-button hide-xs class=\"md-accent md-hue-3 md-mini\" ng-disabled=\"vm.showBusyText || loading_embedly || !showPreview\" ng-click=\"vm.showUrlEducationDialog($event)\" aria-label=\"No, but why?\">\n" +
    "                                                        No\n" +
    "                                                    </md-button>\n" +
    "                                                    <md-button class=\"md-primary md-raised\" ng-disabled=\"vm.showBusyText || loading_embedly || !showPreview\" ng-click=\"vm.submitCurrentStep(vm.stepData[0])\" aria-label=\"Yep, let's move on!\">\n" +
    "                                                        Yes<span hide-xs>, let's move on!</span>\n" +
    "                                                    </md-button>\n" +
    "                                                </div>\n" +
    "                                            </md-toolbar>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </md-step-body>\n"
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
    "            <md-subheader>Links</md-subheader>\n" +
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
    "            <!--<md-menu>-->\n" +
    "            <!--    <md-button aria-label=\"Open Settings\" ng-click=\"layout.openMenu($mdOpenMenu, $event)\">-->\n" +
    "            <!--        <md-icon> more_vert </md-icon>-->\n" +
    "            <!--    </md-button>-->\n" +
    "            <!--    <md-menu-content width=\"4\">-->\n" +
    "            <!--        <md-menu-item>-->\n" +
    "            <!--            <md-button ng-click=\"layout.changeProfile($event)\">-->\n" +
    "            <!--                <md-icon>face</md-icon>-->\n" +
    "            <!--                Profile-->\n" +
    "            <!--            </md-button>-->\n" +
    "            <!--        </md-menu-item>-->\n" +
    "            <!--        <md-menu-item>-->\n" +
    "            <!--            <md-button ng-click=\"layout.changePassword()\">-->\n" +
    "            <!--                <md-icon>lock</md-icon>-->\n" +
    "            <!--                Password-->\n" +
    "            <!--            </md-button>-->\n" +
    "            <!--        </md-menu-item>-->\n" +
    "            <!--        <md-menu-divider></md-menu-divider>-->\n" +
    "            <!--        <md-menu-item>-->\n" +
    "            <!--            <md-button ng-click=\"layout.logOut()\">-->\n" +
    "            <!--                <md-icon>power_settings_new</md-icon>-->\n" +
    "            <!--                Logout-->\n" +
    "            <!--            </md-button>-->\n" +
    "            <!--        </md-menu-item>-->\n" +
    "            <!--    </md-menu-content>-->\n" +
    "            <!--</md-menu>-->\n" +
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
    "                             actual-src=\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUDBAsMBgkICQcJCQgGCQcGBgYFBgcHBQkGBgUHCQcGBgcHChwXBwgaCQcHGCEMGhERHxMfBxciGCIeGBAeHxIBBQUFBwcFDAgIBxIIBQgSHhISEhISHhISEhISHh4SEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEv/AABEIAGAAYAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAHCAMFBgQCAQD/xAA6EAABAgQDBQYFAQgDAQAAAAACAQMABBESBQYiByExMkETQlFSYWIIcXKBoSMzgpGSorLR8BQk4RX/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AG0WPx9I+RDOPIIqS+F0BVZyx5uUknZpw0RGBU9XTTCJbRs6zGI4icw66pNiRCwBUsFoVXSm7wpBF+JraOr75yDRr2LSkLpCVBMx7q06ekAFmbVCUV7yRETg4pP7y3B+YmfcRw7b6J3fNp7sRYPhrkxMCy2JEpeX/wAg97NdkjQEL02KHuG0D6FAAl3CnFqQtOKgr3RVRX3cIv8AD2Udl1lyAxcG20iFUG4e7SGvYy/Ltgggw2iD3bEivm8uS6uoX/GBFrdcI01faGGFJk5pyVnbhJW3GjuElGhad/VIcfYRtHHEJImjokzLgHaj5htp2iRgtoORWJlg9CA4IkQmA6rresCfY9i7mHZqbaKqC6RSrgFzEJlQa19YqnmU/GPKxzST1wpTjQf7Y6C9YCzJeMYra1mQJbCXSUqOECi343EOn7RsDPSvyhZfivxYhsADWggREIlu1ad6QC05mxHtZpwlJVUjMi+ojVbv49Ipe0W/0H+7uxYtYM8Uq5OtgJtMLa5aVXUu3dpZ4V6xYbOsrnPT7cu3dqISdMR5Wh5oygnfDlhaFMG6o8qW3W8ChjmJe2lOb3cvhGXy3l+Xw+TS3TYn6h8CX3LHO9tPkBPsldVLVISIh4xpWyqq+u/+rhHG/dduHqo/LzRVS2epAhEhnARfKW4rvWJix1shV1sk7MSAbxLStxaoD5ijaoBcV3W28Kwv+0PCSbxmUm03K66PL5rq7oOuPTwqFwEhXd4SSkYvMWFJMnJEttrU2yThdLL0ur9oA/5ecXsGitVFNpkv5mki2UvvEEkgoAiNEQUtbt5bB3D+I9ksBNiszawZr3RUrvaIwnXxD48B313uvl5tKNCX43Q1OfcQskHNNVMCBsB4qRpuhBNoc45/9F4Xq1E1HV0tKgjv9IlSrfIcyIybulVQQUCpyqJFXekEz4ZZFtDmnUFaitt3tMuVIHGxdgXH3mnBq2QFp9x7hgy7DcFclX5wTGjbpj2Hrq6xBqc/TAixruVvvCnFRgF5rxiVSYQBkyRT5SMKcxUhn5uSA+Iou7lIajGAzhk9tzWjQK4K/p6E3fKNKCOHygEe9qlpfLveEEzHHf8Aj5cuCo3qkWGXtnVrvbPnRSW+xOVfcsaTPuBg5hJs7lQQ/Tt8w8v3gFmHM0wswgBMm2hLaQ7zC2CfkybdZk0ecnEdR9wBbAh0jaSKVPWkU2GZaQXUvY1abdPH5+Mdue3OxGQZaoBOvkTg920RgybPBZhClWj43NgX8wJHSZxnsjTF2Fy5cbmw+1ookXarBoP9suYBZJv2XH7VtHm+dYS3PM528469uW8iK63vEVYZTbNid8/MNIKIjTdokZUERMKq4pQrOJLrIbkVLi1D1tKJUqyyDmY5KcR8BQ0pY60Y1EvLT1rDIbN8xI+0L279XVaPdK7lhTz3cPqgqbHMdtBWriuArvndEDRMTKrQkJNSR01HmXup1jL5exds2EqSItLSr0KPmP460AWm+gXppJev5jSu6YxVFNRbbv1W3CXDV0+0RYmikwfRaEP+pAj2g577AbZGZGpJc4Vur6fSKpdtF0kouCqviNpEnKXS6njAELD3hW8TFO0aXmLzf4gRbV8YQceYBa2sANxeBOrzfyxHge0G6a/UFRR1dX1d2MjnvEhexYzTeg2BcXtTV+YjJwdguPo9IKyW8pMrCIeoENwF86UglkaQuXwszSoUySVVugCJeJcF+0MK06hcOEVosnxOOqxihWFaM02gueojTTC9Tn7UqcCXTBo+JTGgfxFRQhPsG7bhKooRU4QF3G06kteYYlSvDqcBi0ydPk3ODQqXrq+mKevjXT4xNhy/9gfaoxEHbCMwUESQ046vWB/tEzI4/iPZNkqgCCIjdpQuscU2+4GneiElzZf4jKuvEjpFdRdRe6Au3cKdLTeirTmujyOX6ftHwH96Kg8UctQUdX/fGIXZkl5iUl90BMqiD9wlWxeaPMsqk7duVSLVd5iWORVrx/ej2waoS0410l4QDX/D480MujQigqQCJW0/aiWr8QYmpi3h4wpuw/GibnGxUuYv4kWlfxDQsPIo7+9qt8NMVSLYtMKRKJEpGXMRFUlisdqhJHTxNYgfSkBG+VY7cCbq+g9SSK5FjswmYQHQNa0FRut8sRBZl8IF2SQTAtCaTQe9GOxrKhXKo/1cywfNm5y78gBt0PSIkBeYh61SJsx4G0WgmkAi73h8oBYHsuOjxIaU/eirfbUVtXu96C/mvBVC4LPpXxGBfjrFrtsBV1j2A6V90fEj2qwF5lDGFYmAO7cC3W/T4QwmW9q0sQiJnYVBu7XoXpCwSyav93RMZrdcm5fNAf/Z\"\n" +
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
    "    <md-card-header ng-show=\"embedCode.favicon_url || embedCode.provider_name || embedCode.provider_display\">\n" +
    "        <md-card-avatar ng-show=\"embedCode.favicon_url\">\n" +
    "            <img ng-src=\"{{embedCode.favicon_url}}\" alt=\"{{embedCode.provider_name}}\"/>\n" +
    "        </md-card-avatar>\n" +
    "        <md-card-header-text>\n" +
    "            <span class=\"md-title\" ng-show=\"embedCode.provider_name\">{{embedCode.provider_name}}</span>\n" +
    "            <span class=\"md-subhead\" ng-show=\"embedCode.provider_display\">\n" +
    "                <a href=\"{{embedCode.original_url}}\" target=\"_blank\">\n" +
    "                    <span hide-xs>See more at </span>{{embedCode.provider_display}}\n" +
    "                </a>\n" +
    "            </span>\n" +
    "        </md-card-header-text>\n" +
    "    </md-card-header>\n" +
    "    <img ng-src=\"{{embedCode.images[0].url}}\" class=\"md-card-image\" alt=\"{{embedCode.title}}\" ng-show=\"embedCode.images.length > 0\">\n" +
    "    <md-card-title ng-show=\"embedCode.title\">\n" +
    "        <md-card-title-text>\n" +
    "            <span class=\"md-headline\">{{embedCode.title}}</span>\n" +
    "        </md-card-title-text>\n" +
    "    </md-card-title>\n" +
    "    <md-card-content ng-show=\"embedCode.description\">\n" +
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
