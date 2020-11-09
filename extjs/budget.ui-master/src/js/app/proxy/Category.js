(function () {
    "use strict";

    Ext.define("BudgetUI.proxy.Category", {
        extend: "BudgetUI.proxy.ParseClassBase",
        requires: [
            "BudgetUI.proxy.ParseClassBase"
        ],
        alias: "proxy.category",
        constructor: function (config) {
            Ext.apply(config, {
                url: "/category"
            });

            this.superclass.constructor.apply(this, [
                config
            ]);
        }
    });
})();
