(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.IncomeGrid", {
        extend: "Ext.grid.Panel",
        xtype: "incomeGrid",
        controller: "incomeGrid",
        viewModel: "default",
        viewType: "nestedDataGridView",
        scrollable: true,
        title: "Income",
        plugins: "gridfilters",
        requires: [
            "BudgetUI.store.Income",
            "BudgetUI.view.budget.controller.IncomeGrid",
            "BudgetUI.view.NestedDataGridView"
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
            reference: "createIncomeBtn",
            handler: "onCreateIncomeBtnClick"
        }, {
            xtype: "button",
            text: "Edit",
            reference: "editIncomeBtn",
            handler: "onEditIncomeBtnClick",
            disabled: true
        }, {
            xtype: "button",
            text: "Remove",
            reference: "removeIncomeBtn",
            handler: "onRemoveIncomeBtnClick",
            disabled: true
        }],
        columns: [{
            text: "Source",
            flex: 1,
            dataIndex: "source",
            filter: "string"
        }, {
            text: "Amount",
            flex: 1,
            align: "right",
            dataIndex: "amount",
            formatter: "usMoney",
            filter: "number"
        }, {
            text: "Account",
            flex: 1,
            dataIndex: "account.name"
        }, {
            text: "Receiving On",
            flex: 1,
            dataIndex: "receivingDate",
            formatter: 'date("m/d/Y")',
            filter: "date"
        }]
    });
})();
