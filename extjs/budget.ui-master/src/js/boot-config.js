(function () {
    "use strict";

    var appConfig, extToolkitConfig, extConfig, jsConfig, cssConfig;

    /*
     * The configuration for devMode determines what JS files get included and if the minified versions are used.
     * Note that some configuration values may be override by user settings changes in the UI.
     */
    appConfig = {
        devMode: true
    };

    extToolkitConfig = {
        activeToolkit: "classic",
        classic: {
            themeName: "crisp-touch",
            chartThemeName: "default"
        },
        modern: {
            themeName: "triton",
            chartThemeName: "default"
        }
    };

    extConfig = {
        dir: "bower_components/extjs",
        themePrefix: "theme-",
        toolkit: extToolkitConfig.activeToolkit,
        themeName: extToolkitConfig[extToolkitConfig.activeToolkit].themeName,
        chartThemeName: extToolkitConfig[extToolkitConfig.activeToolkit].chartThemeName,
        debugParam: appConfig.devMode ? "-debug" : "",
        jsBuildFile: "ext-" + (extToolkitConfig.activeToolkit === "modern" ? "modern-" : "") + "all" + (appConfig.devMode ? "-debug" : "") + ".js"
    };

    jsConfig = [{
        path: "{ext.dir}/build/{ext.jsBuildFile}"
    }, {
        path: "{ext.dir}/build/{ext.toolkit}/{ext.themePrefix}{ext.themeName}/{ext.themePrefix}{ext.themeName}.js"
    }, {
        path: "{ext.dir}/build/packages/charts/{ext.toolkit}/charts{ext.debugParam}.js"
    }, {
        path: "dist/budget.ui.min.js",
        bundle: true
    }, {
        path: "src/js/app.js",
        includeInBundle: true
    }];

    cssConfig = [{
        path: "{ext.dir}/build/{ext.toolkit}/{ext.themePrefix}{ext.themeName}/resources/{ext.themePrefix}{ext.themeName}-all{ext.debugParam}.css"
    }, {
        path: "src/css/style.css"
    }];

    window.BootConfig = {
        devMode: appConfig.devMode,
        ext: extConfig,
        js: jsConfig,
        css: cssConfig
    };

    // Allow user settings in local storage to override certain configuration.
    if (!localStorage.getItem("BudgetUI.ext.themeName")) {
        localStorage.setItem("BudgetUI.ext.themeName", BootConfig.ext.themeName);
    } else if (localStorage.getItem("BudgetUI.ext.themeName") !== BootConfig.ext.themeName) {
        BootConfig.ext.themeName = localStorage.getItem("BudgetUI.ext.themeName");
    }

    if (!localStorage.getItem("BudgetUI.ext.chartThemeName")) {
        localStorage.setItem("BudgetUI.ext.chartThemeName", BootConfig.ext.chartThemeName);
    } else if (localStorage.getItem("BudgetUI.ext.chartThemeName") !== BootConfig.ext.chartThemeName) {
        BootConfig.ext.chartThemeName = localStorage.getItem("BudgetUI.ext.chartThemeName");
    }

    if (localStorage.getItem("BudgetUI.devMode") === null) {
        localStorage.setItem("BudgetUI.devMode", BootConfig.devMode);
    } else if (localStorage.getItem("BudgetUI.devMode") !== BootConfig.devMode.toString()) {
        BootConfig.devMode = localStorage.getItem("BudgetUI.devMode") === "true";
    }
})();
