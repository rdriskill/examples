(function () {
    "use strict";

    Ext.define("BudgetUI.proxy.ParseRootBase", {
        extend: "BudgetUI.proxy.ParseClassBase",
        requires: [
            "BudgetUI.proxy.ParseClassBase"
        ],
        alias: "proxy.parseRoot",
        constructor: function (config) {
            BudgetUI.proxy.ParseRootBase.superclass.constructor.apply(this, [
                config
            ]);

            this.setUrl(config.url.replace("/classes", ""));
        }
    });
})();
