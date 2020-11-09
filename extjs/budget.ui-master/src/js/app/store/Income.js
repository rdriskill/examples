(function () {
    "use strict";

    Ext.define("BudgetUI.store.Income", {
        extend: "BudgetUI.store.BaseStore",
        alias: "store.income",
        autoLoad: false,
        autoSync: true,
        model: "BudgetUI.model.Income",
        proxy: "income",
        requires: [
            "BudgetUI.model.Income",
            "BudgetUI.store.BaseStore",
            "BudgetUI.proxy.Income"
        ],
        sorters: [{
            property: "createdAt",
            direction: "DESC"
        }]
    });
}());
