(function () {
    "use strict";

    Ext.define("BudgetUI.store.Transaction", {
        extend: "BudgetUI.store.BaseStore",
        alias: "store.transaction",
        autoLoad: false,
        autoSync: true,
        model: "BudgetUI.model.Transaction",
        proxy: "transaction",
        requires: [
            "BudgetUI.model.Transaction",
            "BudgetUI.store.BaseStore",
            "BudgetUI.proxy.Transaction"
        ],
        sorters: [{
            property: "createdAt",
            direction: "DESC"
        }]
    });
}());
