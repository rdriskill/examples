(function () {
    "use strict";

    Ext.Loader.setConfig({
        enabled: true,
        paths: {
            "BudgetUI.chart": "../src/js/app/chart",
            "BudgetUI.form": "../src/js/app/form",
            "BudgetUI.model": "../src/js/app/model",
            "BudgetUI.proxy": "../src/js/app/proxy",
            "BudgetUI.store": "../src/js/app/store",
            "BudgetUI.view": "../src/js/classic/view"
        }
    });
})();
