(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.IncomePanel", {
        extend: "Ext.form.Panel",
        xtype: "incomePanel",
        viewModel: "default",
        modelValidation: true,
        defaults: {
            padding: 10
        },
        requires: [
            "BudgetUI.form.FloatField"
        ],
        items: [{
            xtype: "textfield",
            fieldLabel: "Source",
            itemId: "source",
            bind: "{income.source}"
        }, {
            xtype: "floatfield",
            fieldLabel: "Amount",
            itemId: "amount",
            bind: "{income.amount}"
        }, {
            xtype: "combobox",
            fieldLabel: "Account",
            itemId: "accountObjectId",
            queryMode: "local",
            displayField: "name",
            valueField: "objectId",
            bind: {
                store: "{accountStore}",
                value: "{income.accountObjectId}"
            }
        }, {
            xtype: "datefield",
            fieldLabel: "Receiving On",
            itemId: "receivingDate",
            bind: "{income.receivingDate}"
        }]
    });
})();
