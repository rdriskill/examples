(function () {
    "use strict";

    Ext.define("BudgetUI.proxy.Budget", {
        extend: "BudgetUI.proxy.ParseClassBase",
        requires: [
            "BudgetUI.proxy.ParseClassBase"
        ],
        alias: "proxy.budget",
        constructor: function (config) {
            Ext.apply(config, {
                url: "/budget"
            });

            this.superclass.constructor.apply(this, [
                config
            ]);
        }
    });
})();
