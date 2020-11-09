(function () {
    "use strict";

    var getConfigKeyValues, resolvePathParams, loadScripts, loadStyleSheets, bootup;

    /**
     * Complies a key value object based on application configuration for
     * use with CSS and JavaScript path parameter placeholder replacements.
     */
    getConfigKeyValues = function () {
        var keyVals, key, value, nestedKey, nestedValue;
        keyVals = {};

        for (key in BootConfig) {
            if (BootConfig.hasOwnProperty(key)) {
                value = BootConfig[key];

                if (value !== undefined && value !== null) {
                    if (typeof value === "object") {
                        for (nestedKey in value) {
                            if (value.hasOwnProperty(nestedKey)) {
                                nestedValue = value[nestedKey];
                                keyVals["{" + key + "." + nestedKey + "}"] = nestedValue;
                            }
                        }
                    } else {
                        keyVals["{" + key + "}"] = value;
                    }
                }
            }
        }

        return keyVals;
    };

    /**
     * Replaces any application configuration place holders with their actual values.
     */
    resolvePathParams = function (path) {
        var keyVals, key;
        keyVals = getConfigKeyValues();

        for (key in keyVals) {
            if (keyVals.hasOwnProperty(key)) {
                path = path.replace(RegExp(key, "g"), keyVals[key]);
            }
        }

        return path;
    };

    /**
     * Loads scripts from the specified js paths in BootConfig.
     */
    loadScripts = function (scripts) {
        var load = function (path) {
            var script, head;
            script = document.createElement("script");
            script.type = "text/javascript";
            script.src = resolvePathParams(path);
            script.async = false;
            head = document.getElementsByTagName("head").item(0);
            head.appendChild(script);
        };

        scripts.forEach(function (jsResource) {

            if (!BootConfig.devMode && !jsResource.includeInBundle && jsResource.bundle || !BootConfig.devMode && !jsResource.includeInBundle && !jsResource.bundle || BootConfig.devMode && jsResource.includeInBundle && !jsResource.bundle || BootConfig.devMode && !jsResource.includeInBundle && !jsResource.bundle) {
                if (jsResource.path) {
                    load(jsResource.path);
                } else {
                    throw "No path specified for JavaScript resource.";
                }
            }

        });
    };

    /**
     * Loads style sheets from the specified css paths in BootConfig.
     */
    loadStyleSheets = function (styleSheets) {
        var load = function (path) {
            var link, head;
            link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = resolvePathParams(path);
            head = document.getElementsByTagName("head").item(0);
            head.appendChild(link);
        };

        styleSheets.forEach(function (cssResource) {
            if (cssResource.path) {
                load(cssResource.path);
            } else {
                throw "No path specified for CSS resource.";
            }
        });
    };

    /**
     * Boots up the application.
     */
    bootup = function () {
        loadScripts(BootConfig.js);
        loadStyleSheets(BootConfig.css);
    };

    // Let's fire it up and see what she does.
    bootup();
})();
