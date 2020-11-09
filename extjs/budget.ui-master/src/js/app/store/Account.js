(function () {
    "use strict";

    Ext.define("BudgetUI.store.Account", {
        extend: "BudgetUI.store.BaseStore",
        alias: "store.account",
        autoLoad: false,
        autoSync: true,
        model: "BudgetUI.model.Account",
        proxy: "account",
        requires: [
            "BudgetUI.model.Account",
            "BudgetUI.store.BaseStore",
            "BudgetUI.proxy.Account"
        ],
        sorters: [{
            property: "createdAt",
            direction: "DESC"
        }]
    });
}());
