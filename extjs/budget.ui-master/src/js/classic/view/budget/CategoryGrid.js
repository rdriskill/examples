(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.CategoryGrid", {
        extend: "Ext.grid.Panel",
        xtype: "categoryGrid",
        controller: "categoryGrid",
        viewModel: "default",
        scrollable: true,
        title: "Categories",
        requires: [
            "BudgetUI.view.budget.controller.CategoryGrid",
            "BudgetUI.store.Category"
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
            reference: "createCategoryBtn",
            handler: "onCreateCategoryBtnClick"
        }, {
            xtype: "button",
            text: "Edit",
            reference: "editCategoryBtn",
            handler: "onEditCategoryBtnClick",
            disabled: true
        }, {
            xtype: "button",
            text: "Remove",
            reference: "removeCategoryBtn",
            handler: "onRemoveCategoryBtnClick",
            disabled: true
        }],
        columns: [{
            text: "Name",
            flex: 0.40,
            dataIndex: "name",
            editor: "textfield"
        }, {
            text: "Available",
            flex: 0.15,
            align: "right",
            dataIndex: "available",
            formatter: "usMoney",
            editor: "textfield"
        }, {
            text: "(%) Spent",
            flex: 0.15,
            align: "right",
            dataIndex: "percentSpent",
            renderer: "categoryProgressRenderer"
        }, {
            text: "($) Spent",
            flex: 0.15,
            align: "right",
            dataIndex: "spent",
            formatter: "usMoney"
        }, {
            text: "Remaining",
            flex: 0.15,
            align: "right",
            dataIndex: "remaining",
            formatter: "usMoney"
        }]
    });
})();
