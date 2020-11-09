(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.TransactionPanel", {
        extend: "Ext.form.Panel",
        xtype: "transactionPanel",
        viewModel: "default",
        modelValidation: true,
        defaults: {
            padding: 10
        },
        requires: [
            "BudgetUI.form.FloatField"
        ],
        items: [{
            xtype: "datefield",
            fieldLabel: "Transaction Date",
            itemId: "transactionDate",
            bind: "{transaction.transactionDate}"
        }, {
            xtype: "textfield",
            fieldLabel: "Check #",
            itemId: "checkNumber",
            bind: "{transaction.checkNumber}"
        }, {
            xtype: "textfield",
            fieldLabel: "Description",
            itemId: "description",
            bind: "{transaction.description}"
        }, {
            xtype: "combobox",
            fieldLabel: "Category",
            itemId: "categoryObjectId",
            queryMode: "local",
            displayField: "name",
            valueField: "objectId",
            bind: {
                store: "{categoryStore}",
                value: "{transaction.categoryObjectId}"
            }
        }, {
            xtype: "combobox",
            fieldLabel: "Account",
            itemId: "accountObjectId",
            queryMode: "local",
            displayField: "name",
            valueField: "objectId",
            bind: {
                store: "{accountStore}",
                value: "{transaction.accountObjectId}"
            }
        }, {
            xtype: "checkbox",
            fieldLabel: "Reconciled",
            bind: "{transaction.isReconciled}"
        }, {
            xtype: "floatfield",
            fieldLabel: "Withdrawal",
            itemId: "withdrawal",
            bind: "{transaction.withdrawal}"
        }, {
            xtype: "floatfield",
            fieldLabel: "Deposit",
            itemId: "deposit",
            bind: "{transaction.deposit}"
        }]
    });
})();
