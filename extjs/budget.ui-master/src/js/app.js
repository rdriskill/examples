(function () {
    "use strict";

    /**
     * Controls dynamic dependency loading of ExtJS classes.
     */
    Ext.Loader.setConfig({
        enabled: BootConfig.devMode,
        paths: {
            "BudgetUI.Application": Ext.String.format("./src/js/{0}/Application.js", BootConfig.ext.toolkit),
            "BudgetUI.chart": "./src/js/app/chart",
            "BudgetUI.form": "./src/js/app/form",
            "BudgetUI.model": "./src/js/app/model",
            "BudgetUI.proxy": "./src/js/app/proxy",
            "BudgetUI.store": "./src/js/app/store",
            "BudgetUI.view": Ext.String.format("./src/js/{0}/view", BootConfig.ext.toolkit)
        }
    });

    /**
     * This is responsible for launching the application. Application logic
     * should be placed in the BudgetUI.Application class.
     */
    Ext.application({
        extend: "BudgetUI.Application",
        name: "BudgetUI"
    });
})();
