(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.AccountPanel", {
        extend: "Ext.panel.Panel",
        xtype: "accountPanel",
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
            fieldLabel: "Name",
            itemId: "name",
            bind: "{account.name}"
        }, {
            xtype: "floatfield",
            fieldLabel: "Beginning Balance",
            itemId: "beginningBalance",
            bind: "{account.beginningBalance}"
        }]
    });
})();
