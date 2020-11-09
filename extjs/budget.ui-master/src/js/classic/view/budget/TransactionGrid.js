(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.TransactionGrid", {
        extend: "Ext.grid.Panel",
        xtype: "transactionGrid",
        controller: "transactionGrid",
        viewModel: "default",
        viewType: "nestedDataGridView",
        scrollable: true,
        title: "Transactions",
        requires: [
            "BudgetUI.store.Transaction",
            "BudgetUI.view.budget.controller.TransactionGrid",
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
            reference: "createTransactionBtn",
            handler: "onCreateTransactionBtnClick"
        }, {
            xtype: "button",
            text: "Edit",
            reference: "editTransactionBtn",
            handler: "onEditTransactionBtnClick",
            disabled: true
        }, {
            xtype: "button",
            text: "Remove",
            reference: "removeTransactionBtn",
            handler: "onRemoveTransactionBtnClick",
            disabled: true
        }],
        columns: [{
            text: "Date",
            flex: 0.10,
            dataIndex: "transactionDate",
            formatter: 'date("m/d/Y")'
        }, {
            text: "Check #",
            flex: 0.08,
            dataIndex: "checkNumber"
        }, {
            text: "Description",
            flex: 0.29,
            dataIndex: "description"
        }, {
            text: "Category",
            flex: 0.15,
            dataIndex: "category.name"
        }, {
            text: "Account",
            flex: 0.10,
            dataIndex: "account.name"
        }, {
            text: "Reconciled",
            flex: 0.08,
            align: "center",
            dataIndex: "isReconciled",
            renderer: "booleanCheckmarkRenderer"
        }, {
            text: "Withdrawal",
            flex: 0.10,
            align: "right",
            dataIndex: "withdrawal",
            formatter: "usMoney"
        }, {
            text: "Deposit",
            flex: 0.10,
            align: "right",
            dataIndex: "deposit",
            formatter: "usMoney"
        }]
    });
})();
