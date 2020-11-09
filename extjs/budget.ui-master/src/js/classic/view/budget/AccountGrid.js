(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.AccountGrid", {
        extend: "Ext.grid.Panel",
        xtype: "accountGrid",
        controller: "accountGrid",
        viewModel: "default",
        scrollable: true,
        title: "Accounts",
        plugins: "gridfilters",
        requires: [
            "BudgetUI.store.Account",
            "BudgetUI.view.budget.controller.AccountGrid"
        ],
        selModel: {
            selType: "rowmodel",
            allowDeselect: true,
            mode: "SIMPLE"
        },
        viewConfig: {
            stripeRows: false,
            enableTextSelection: true
        },
        listeners: {
            render: "onGridRender",
            selectionchange: "onRowSelectionChange"
        },
        tbar: [{
            xtype: "button",
            text: "Create",
            reference: "createAccountBtn",
            handler: "onCreateAccountBtnClick"
        }, {
            xtype: "button",
            text: "Edit",
            reference: "editAccountBtn",
            handler: "onEditAccountBtnClick",
            disabled: true
        }, {
            xtype: "button",
            text: "Remove",
            reference: "removeAccountBtn",
            handler: "onRemoveAccountBtnClick",
            disabled: true
        }],
        columns: [{
            text: "Name",
            flex: 1,
            dataIndex: "name",
            filter: "string"
        }, {
            text: "Beginning Balance",
            flex: 1,
            align: "right",
            dataIndex: "beginningBalance",
            filter: "number",
            formatter: "usMoney"
        }, {
            text: "Current Balance",
            flex: 1,
            align: "right",
            dataIndex: "currentBalance",
            filter: "number",
            formatter: "usMoney"
        }]
    });
})();
