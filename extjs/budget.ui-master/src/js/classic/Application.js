(function () {
    "use strict";

    Ext.define("BudgetUI.Application", {
        extend: "Ext.app.Application",
        name: "BudgetUI",
        namespaces: [
            "BudgetUI.chart",
            "BudgetUI.form",
            "BudgetUI.model",
            "BudgetUI.proxy",
            "BudgetUI.store",
            "BudgetUI.view"
        ],
        requires: [
            "BudgetUI.model.User"
        ],
        views: [
            "BudgetUI.view.main.Main"
        ],
        stores: [
            "BudgetUI.store.Budget"
        ],
        launch: function () {
            Ext.Ajax.cors = true;
            var user = BudgetUI.model.User.getCurrentUser();

            Ext.create({
                xtype: user ? "app-main" : "loginWindow"
            });
        }
    });
})();
