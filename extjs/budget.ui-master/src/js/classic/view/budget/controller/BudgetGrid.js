(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.controller.BudgetGrid", {
        extend: "Ext.app.ViewController",
        alias: "controller.budgetGrid",
        onRowSelectionChange: function (grid, selectedRecords, eOpts) {
            var references = this.getReferences();
            references.viewBudgetBtn.setDisabled(selectedRecords.length === 0 || selectedRecords.length > 2);
            references.removeBudgetBtn.setDisabled(selectedRecords.length === 0);
        },
        onCreateBudgetBtnClick: function () {
            this.redirectTo("new/budgets");
        },
        onViewBudgetBtnClick: function () {
            var controller, grid, path;
            controller = this;
            grid = controller.getView();
            path = "view/budgets";

            Ext.Array.each(grid.getSelection(), function (record) {
                path += "/" + record.get("objectId");
            });

            this.redirectTo(path);
        },
        onRemoveBudgetBtnClick: function () {
            var controller, grid;
            controller = this;
            grid = controller.getView();

            Ext.Msg.show({
                title: "Remove Budgets",
                message: "Are you sure you would like to remove the selected budgets?",
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
