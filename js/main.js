/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';


requirejs.config(
        {
            baseUrl: 'js',

            // Path mappings for the logical module names
            // Update the main-release-paths.json for release mode when updating the mappings
            paths:
                    //injector:mainReleasePaths
                            {
                                'knockout': 'libs/knockout/knockout-3.4.0',
                                'jquery': 'libs/jquery/jquery-3.1.1.min',
                                'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0.min',
                                'ojs': 'libs/oj/v3.2.0/min',
                                'ojL10n': 'libs/oj/v3.2.0/ojL10n',
                                'ojtranslations': 'libs/oj/v3.2.0/resources',
                                'text': 'libs/require/text',
                                'promise': 'libs/es6-promise/es6-promise.min',
                                'hammerjs': 'libs/hammer/hammer-2.0.8.min',
                                'signals': 'libs/js-signals/signals.min',
                                'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
                                'css': 'libs/require-css/css.min',
                                'customElements': 'libs/webcomponents/CustomElements.min',
                                'proj4': 'libs/proj4js/dist/proj4',
                                
                            }
                    //endinjector
                    ,
                    // Shim configurations for modules that do not expose AMD
                    shim:
                            {
                                'jquery':
                                        {
                                            exports: ['jQuery', '$']
                                        }
                            }
                }
        );

        /**
         * A top-level require call executed by the Application.
         * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
         * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
         * objects in the callback
         */
        require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout',
            'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton',
            'ojs/ojtoolbar'],
                function (oj, ko, app) { // this callback gets executed when all required modules are loaded

                    $(function () {
                        oj.Router.sync().then(
                                function () {
                                    // Bind your ViewModel for the content of the whole page body.
                                    ko.applyBindings(app, document.getElementById('globalBody'));


                                },
                                function (error) {
                                    oj.Logger.error('Error in root start: ' + error.message);
                                }
                        );


                    });

                }
        );
