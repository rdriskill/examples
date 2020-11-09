(function () {
    "use strict";

    Ext.define("BudgetUI.proxy.Account", {
        extend: "BudgetUI.proxy.ParseClassBase",
        requires: [
            "BudgetUI.proxy.ParseClassBase"
        ],
        alias: "proxy.account",
        constructor: function (config) {
            Ext.apply(config, {
                url: "/account"
            });

            this.superclass.constructor.apply(this, [
                config
            ]);
        }
    });
})();
