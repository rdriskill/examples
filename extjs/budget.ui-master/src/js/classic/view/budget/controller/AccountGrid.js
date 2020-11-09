(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.controller.AccountGrid", {
        extend: "Ext.app.ViewController",
        alias: "controller.accountGrid",
        requires: [
            "BudgetUI.model.Account",
            "BudgetUI.view.budget.AccountPanel"
        ],
        onRowSelectionChange: function (grid, selectedRecords, eOpts) {
            var references = this.getReferences();
            references.removeAccountBtn.setDisabled(selectedRecords.length === 0);
            references.editAccountBtn.setDisabled(selectedRecords.length === 0 || selectedRecords.length > 1);
        },
        onGridRender: function (grid, eOpts) {
            var budgetModel, viewModel;
            viewModel = grid.getViewModel();
            budgetModel = viewModel.get("budget");

            viewModel.bind({
                    bindTo: "{transactionStore}",
                    single: true
                },
                function (transactionStore) {
                    transactionStore.initialLoad({
                        callback: function () {
                            // Refresh the category grid when changes occur in the transaction store.
                            transactionStore.on("update", grid.getView().refresh, grid.getView());
                            transactionStore.on("datachanged", grid.getView().refresh, grid.getView());

                            viewModel.bind({
                                    bindTo: "{accountStore}",
                                    single: true
                                },
                                function (accountStore) {
                                    accountStore.initialLoad();
                                }
                            );
                        }
                    });
                }
            );
        },
        onCreateAccountBtnClick: function () {
            var controller, grid, budgetModel, accountModel;
            controller = this;
            grid = controller.getView();
            budgetModel = grid.getViewModel().get("budget");
            accountModel = Ext.create("BudgetUI.model.Account");
            accountModel.set("budgetObjectId", budgetModel.get("objectId"));
            grid.getStore().add(accountModel);
            grid.setSelection(accountModel);
            controller.onEditAccountBtnClick();
        },
        onEditAccountBtnClick: function () {
            var controller, grid, accountWindow;
            controller = this;
            grid = controller.getView();
            accountWindow = Ext.create("Ext.window.Window", {
                title: "Account",
                viewModel: "default",
                modal: true,
                defaultFocus: "name",
                items: [{
                    xtype: "accountPanel"
                }]
            });

            accountWindow.getViewModel().set("account", grid.getSelection()[0]);
            accountWindow.show();
        },
        onRemoveAccountBtnClick: function () {
            var controller, grid;
            controller = this;
            grid = controller.getView();

            Ext.Msg.show({
                title: "Remove Accounts",
                message: "Are you sure you would like to remove the selected accounts?",
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
        }
    });
})();
