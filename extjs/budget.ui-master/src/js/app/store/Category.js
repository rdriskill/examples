(function () {
    "use strict";

    Ext.define("BudgetUI.store.Category", {
        extend: "BudgetUI.store.BaseStore",
        alias: "store.category",
        autoLoad: false,
        autoSync: true,
        model: "BudgetUI.model.Category",
        proxy: "category",
        requires: [
            "BudgetUI.model.Category",
            "BudgetUI.store.BaseStore",
            "BudgetUI.proxy.Category"
        ],
        sorters: [{
            property: "createdAt",
            direction: "DESC"
        }]
    });
}());
