(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.model.BudgetPanel", {
        extend: "Ext.app.ViewModel",
        alias: "viewmodel.budgetPanel",
        formulas: {
            categoryTotalFormatted: function (get) {
                var budgetModel, result;
                budgetModel = get("budget");
                result = budgetModel ? budgetModel.get("categoryTotal") || 0 : 0;
                return Ext.util.Format.usMoney(result);
            },
            incomeTotalFormatted: function (get) {
                var budgetModel, result;
                budgetModel = get("budget");
                result = budgetModel ? budgetModel.get("incomeTotal") || 0 : 0;
                return Ext.util.Format.usMoney(result);
            },
            transactionWithdrawalTotalFormatted: function (get) {
                var budgetModel, result;
                budgetModel = get("budget");
                result = budgetModel ? budgetModel.get("transactionWithdrawalTotal") || 0 : 0;
                return Ext.util.Format.usMoney(result);
            }
        }
    });
}());
