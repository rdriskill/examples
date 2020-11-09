(function () {
    "use strict";

    Ext.define("BudgetUI.proxy.User", {
        extend: "BudgetUI.proxy.ParseRootBase",
        requires: [
            "BudgetUI.proxy.ParseRootBase"
        ],
        alias: "proxy.user",
        constructor: function (config) {
            Ext.apply(config, {
                url: "/users"
            });

            this.superclass.constructor.apply(this, [
                config
            ]);
        }
    });
})();
