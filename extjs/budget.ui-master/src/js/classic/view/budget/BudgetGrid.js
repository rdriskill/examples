(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.BudgetGrid", {
        extend: "Ext.grid.Panel",
        xtype: "budgetGrid",
        controller: "budgetGrid",
        store: "BudgetUI.store.Budget",
        scrollable: true,
        title: "Budgets",
        plugins: "gridfilters",
        requires: [
            "BudgetUI.view.budget.controller.BudgetGrid",
            "BudgetUI.store.Budget"
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
            selectionchange: "onRowSelectionChange"
        },
        tbar: [{
            xtype: "button",
            text: "Create",
            reference: "createBudgetBtn",
            handler: "onCreateBudgetBtnClick"
        }, {
            xtype: "button",
            text: "View",
            reference: "viewBudgetBtn",
            handler: "onViewBudgetBtnClick",
            disabled: true
        }, {
            xtype: "button",
            text: "Remove",
            reference: "removeBudgetBtn",
            handler: "onRemoveBudgetBtnClick",
            disabled: true
        }],
        bbar: [{
            xtype: "pagingtoolbar",
            store: "BudgetUI.store.Budget",
            displayInfo: true
        }],
        columns: [{
            text: "Name",
            flex: 0.25,
            dataIndex: "name",
            filter: "string"
        }, {
            text: "Income Total",
            flex: 0.15,
            align: "right",
            dataIndex: "incomeTotal",
            formatter: "usMoney"
        }, {
            text: "Category Total",
            flex: 0.15,
            align: "right",
            dataIndex: "categoryTotal",
            formatter: "usMoney"
        }, {
            text: "Transaction Total",
            flex: 0.15,
            align: "right",
            dataIndex: "transactionWithdrawalTotal",
            formatter: "usMoney"
        }, {
            text: "Created",
            flex: 0.15,
            dataIndex: "createdAt",
            formatter: 'date("m/d/Y h:i:s T")',
            filter: "date"
        }, {
            text: "Last Updated",
            flex: 0.15,
            dataIndex: "updatedAt",
            formatter: 'date("m/d/Y h:i:s T")',
            filter: "date"
        }]
    });
})();
