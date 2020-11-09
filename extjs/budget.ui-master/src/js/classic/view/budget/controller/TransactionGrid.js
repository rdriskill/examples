(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.controller.TransactionGrid", {
        extend: "Ext.app.ViewController",
        alias: "controller.transactionGrid",
        requires: [
            "BudgetUI.view.budget.TransactionPanel",
            "BudgetUI.model.Transaction"
        ],
        onRowSelectionChange: function (grid, selectedRecords, eOpts) {
            var references = this.getReferences();
            references.removeTransactionBtn.setDisabled(selectedRecords.length === 0);
            references.editTransactionBtn.setDisabled(selectedRecords.length === 0 || selectedRecords.length > 1);
        },
        onGridRender: function (grid, eOpts) {
            var viewModel = grid.getViewModel();

            viewModel.bind({
                    bindTo: "{transactionStore}",
                    single: true
                },
                function (transactionStore) {
                    transactionStore.initialLoad();
                }
            );
        },
        onCreateTransactionBtnClick: function () {
            var controller, grid, budgetModel, transactionModel;
            controller = this;
            grid = controller.getView();
            budgetModel = grid.getViewModel().get("budget");
            transactionModel = Ext.create("BudgetUI.model.Transaction");
            transactionModel.set("budgetObjectId", budgetModel.get("objectId"));
            grid.getStore().add(transactionModel);
            grid.setSelection(transactionModel);
            controller.onEditTransactionBtnClick();
        },
        onEditTransactionBtnClick: function () {
            var controller, grid, transactionWindow, accountStore, categoryStore, budgetModel;
            controller = this;
            grid = controller.getView();
            accountStore = grid.getViewModel().get("accountStore");
            categoryStore = grid.getViewModel().get("categoryStore");
            budgetModel = grid.getViewModel().get("budget");

            accountStore.initialLoad();
            categoryStore.initialLoad();

            transactionWindow = Ext.create("Ext.window.Window", {
                title: "Transaction",
                viewModel: "default",
                modal: true,
                defaultFocus: "name",
                items: [{
                    xtype: "transactionPanel"
                }]
            });

            transactionWindow.getViewModel().set("transaction", grid.getSelection()[0]);
            transactionWindow.getViewModel().set("accountStore", accountStore);
            transactionWindow.getViewModel().set("categoryStore", categoryStore);
            transactionWindow.show();
        },
        onRemoveTransactionBtnClick: function () {
            var controller, grid;
            controller = this;
            grid = controller.getView();

            Ext.Msg.show({
                title: "Remove Transactions",
                message: "Are you sure you would like to remove the selected transactions?",
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === "yes") {
                        Ext.Array.each(grid.getSelection(), function (record) {
                            grid.getStore().remove(record);
                        });
                    }
                }
            });
        },
        booleanCheckmarkRenderer: function (value) {
            return ((value === true) ? "&#x2714;" : "");
        }
    });
})();
