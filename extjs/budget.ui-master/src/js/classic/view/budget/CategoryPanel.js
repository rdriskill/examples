(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.CategoryPanel", {
        extend: "Ext.form.Panel",
        xtype: "categoryPanel",
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
            bind: "{category.name}"
        }, {
            xtype: "floatfield",
            fieldLabel: "Available",
            itemId: "available",
            bind: "{category.available}"
        }, {
            xtype: "floatfield",
            disabled: true,
            fieldLabel: "Spent",
            itemId: "spent",
            bind: "{category.spent}"
        }, {
            xtype: "floatfield",
            disabled: true,
            fieldLabel: "Remaining",
            itemId: "remaining",
            bind: "{category.remaining}"
        }]
    });
})();
