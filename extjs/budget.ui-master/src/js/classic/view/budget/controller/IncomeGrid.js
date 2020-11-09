(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.controller.IncomeGrid", {
        extend: "Ext.app.ViewController",
        alias: "controller.incomeGrid",
        requires: [
            "BudgetUI.model.Income",
            "BudgetUI.view.budget.IncomePanel"
        ],
        onRowSelectionChange: function (grid, selectedRecords, eOpts) {
            var references = this.getReferences();
            references.removeIncomeBtn.setDisabled(selectedRecords.length === 0);
            references.editIncomeBtn.setDisabled(selectedRecords.length === 0 || selectedRecords.length > 1);
        },
        onGridRender: function (grid, eOpts) {
            var viewModel = grid.getViewModel();

            viewModel.bind({
                    bindTo: "{incomeStore}",
                    single: true
                },
                function (incomeStore) {
                    incomeStore.initialLoad();
                }
            );
        },
        onCreateIncomeBtnClick: function () {
            var controller, grid, budgetModel, incomeModel;
            controller = this;
            grid = controller.getView();
            budgetModel = grid.getViewModel().get("budget");
            incomeModel = Ext.create("BudgetUI.model.Income");
            incomeModel.set("budgetObjectId", budgetModel.get("objectId"));
            grid.getStore().add(incomeModel);
            grid.setSelection(incomeModel);
            controller.onEditIncomeBtnClick();
        },
        onEditIncomeBtnClick: function () {
            var controller, grid, incomeWindow, accountStore, budgetModel;
            controller = this;
            grid = controller.getView();
            accountStore = grid.getViewModel().get("accountStore");
            budgetModel = grid.getViewModel().get("budget");

            accountStore.initialLoad();

            incomeWindow = Ext.create("Ext.window.Window", {
                title: "Income",
                viewModel: "default",
                modal: true,
                defaultFocus: "source",
                items: [{
                    xtype: "incomePanel"
                }]
            });

            incomeWindow.getViewModel().set("income", grid.getSelection()[0]);
            incomeWindow.getViewModel().set("accountStore", accountStore);
            incomeWindow.show();
        },
        onRemoveIncomeBtnClick: function () {
            var controller, grid;
            controller = this;
            grid = controller.getView();

            Ext.Msg.show({
                title: "Remove Income",
                message: "Are you sure you would like to remove the selected income records?",
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
