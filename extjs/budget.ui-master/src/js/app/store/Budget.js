(function () {
    "use strict";

    Ext.define("BudgetUI.store.Budget", {
        extend: "BudgetUI.store.BaseStore",
        alias: "store.budget",
        autoLoad: true,
        autoSync: true,
        model: "BudgetUI.model.Budget",
        requires: [
            "BudgetUI.model.Budget",
            "BudgetUI.store.BaseStore",
            "BudgetUI.proxy.Budget"
        ],
        proxy: "budget",
        sorters: [{
            property: "createdAt",
            direction: "DESC"
        }]
    });
}());
