(function () {
    "use strict";

    Ext.define("BudgetUI.proxy.Transaction", {
        extend: "BudgetUI.proxy.ParseClassBase",
        requires: [
            "BudgetUI.proxy.ParseClassBase"
        ],
        alias: "proxy.transaction",
        constructor: function (config) {
            Ext.apply(config, {
                url: "/transaction"
            });

            this.superclass.constructor.apply(this, [
                config
            ]);
        }
    });
})();
