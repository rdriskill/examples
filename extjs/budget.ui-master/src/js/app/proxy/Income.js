(function () {
    "use strict";

    Ext.define("BudgetUI.proxy.Income", {
        extend: "BudgetUI.proxy.ParseClassBase",
        requires: [
            "BudgetUI.proxy.ParseClassBase"
        ],
        alias: "proxy.income",
        constructor: function (config) {
            Ext.apply(config, {
                url: "/income"
            });

            this.superclass.constructor.apply(this, [
                config
            ]);
        }
    });
})();
