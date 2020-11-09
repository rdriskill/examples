(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.controller.BudgetPanel", {
        extend: "Ext.app.ViewController",
        alias: "controller.budgetPanel",
        onPanelBeforeRender: function (panel, eOpts) {
            var budgetModel, storeConfig;
            budgetModel = panel.getViewModel().get("budget");

            storeConfig = {
                categoryStore: budgetModel.getCategories(),
                transactionStore: budgetModel.getTransactions(),
                accountStore: budgetModel.getAccounts(),
                incomeStore: budgetModel.getIncomes()
            };

            panel.getViewModel().setStores(storeConfig);
        }
    });
})();
