(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.BudgetPanel", {
        extend: "Ext.panel.Panel",
        xtype: "budgetPanel",
        viewModel: "budgetPanel",
        controller: "budgetPanel",
        scrollable: true,
        requires: [
            "BudgetUI.view.budget.CategoryGrid",
            "BudgetUI.view.budget.TransactionGrid",
            "BudgetUI.view.budget.AccountGrid",
            "BudgetUI.view.budget.IncomeGrid",
            "BudgetUI.view.budget.controller.BudgetPanel",
            "BudgetUI.view.budget.model.BudgetPanel",
            "BudgetUI.view.ProgressBar",
            "BudgetUI.view.budget.CategoryBarChart"
        ],
        listeners: {
            beforerender: "onPanelBeforeRender"
        },
        bind: {
            title: "{budget.name}"
        },
        defaults: {
            padding: 10
        },
        items: [{
            xtype: "container",
            layout: "vbox",
            width: "75%",
            defaults: {
                margin: "0 0 5 0 0",
                width: "100%"
            },
            items: [{
                xtype: "pbar",
                textTpl: "{value:percent('0.00')} of Categories per Income",
                bind: {
                    value: "{budget.categoryPercent}"
                }
            }, {
                xtype: "pbar",
                textTpl: "{value:percent('0.00')} of Transactions per Income",
                bind: {
                    value: "{budget.transactionWithdrawalPercent}"
                }
            }]
        }, {
            xtype: "tabpanel",
            activeTab: 1,
            items: [{
                xtype: "container",
                reference: "detailsPanel",
                title: "Details",
                items: [{
                    xtype: "container",
                    layout: "vbox",
                    defaults: {
                        padding: 10,
                        labelWidth: 175,
                        fieldWidth: 175
                    },
                    items: [{
                        xtype: "textfield",
                        fieldLabel: "Budget Name",
                        bind: "{budget.name}"
                    }, {
                        xtype: "datefield",
                        fieldLabel: "Begin Date",
                        bind: "{budget.beginDate}"
                    }, {
                        xtype: "datefield",
                        fieldLabel: "EndDate",
                        bind: "{budget.endDate}"
                    }]
                }]
            }, {
                xtype: "container",
                title: "Categories",
                layout: "hbox",
                defaults: {
                    padding: 10
                },
                items: [{
                    xtype: "categoryBarChart",
                    reference: "categoryChart",
                    flex: 0.20,
                    bind: {
                        store: "{categoryStore}"
                    }
                }, {
                    xtype: "categoryGrid",
                    reference: "categoryGrid",
                    flex: 0.80,
                    bind: {
                        store: "{categoryStore}"
                    }
                }]
            }, {
                xtype: "accountGrid",
                reference: "accountGrid",
                bind: {
                    store: "{accountStore}"
                }
            }, {
                xtype: "incomeGrid",
                reference: "incomeGrid",
                bind: {
                    store: "{incomeStore}"
                }
            }, {
                xtype: "transactionGrid",
                reference: "transactionGrid",
                bind: {
                    store: "{transactionStore}"
                }
            }]
        }]
    });
})();
