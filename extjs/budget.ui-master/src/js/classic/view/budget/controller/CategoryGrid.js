(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.controller.CategoryGrid", {
        extend: "Ext.app.ViewController",
        alias: "controller.categoryGrid",
        requires: [
            "BudgetUI.view.budget.CategoryPanel",
            "BudgetUI.model.Category",
            "BudgetUI.chart.Themes"
        ],
        onRowSelectionChange: function (grid, selectedRecords, eOpts) {
            var references = this.getReferences();
            references.removeCategoryBtn.setDisabled(selectedRecords.length === 0);
            references.editCategoryBtn.setDisabled(selectedRecords.length === 0 || selectedRecords.length > 1);
        },
        onGridRender: function (grid, eOpts) {
            var viewModel = grid.getViewModel();

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
                                    bindTo: "{categoryStore}",
                                    single: true
                                },
                                function (categoryStore) {
                                    categoryStore.initialLoad();
                                }
                            );
                        }
                    });
                }
            );
        },
        onCreateCategoryBtnClick: function () {
            var controller, grid, budgetModel, categoryModel;
            controller = this;
            grid = controller.getView();
            budgetModel = grid.getViewModel().get("budget");
            categoryModel = Ext.create("BudgetUI.model.Category");
            categoryModel.set("budgetObjectId", budgetModel.get("objectId"));
            grid.getStore().add(categoryModel);
            grid.setSelection(categoryModel);
            controller.onEditCategoryBtnClick();
        },
        onEditCategoryBtnClick: function () {
            var controller, grid, categoryWindow;
            controller = this;
            grid = controller.getView();
            categoryWindow = Ext.create("Ext.window.Window", {
                title: "Category",
                viewModel: "default",
                modal: true,
                defaultFocus: "name",
                items: [{
                    xtype: "categoryPanel"
                }]
            });

            categoryWindow.getViewModel().set("category", grid.getSelection()[0]);
            categoryWindow.show();
        },
        onRemoveCategoryBtnClick: function () {
            var controller, grid;
            controller = this;
            grid = controller.getView();

            Ext.Msg.show({
                title: "Remove Categories",
                message: "Are you sure you would like to remove the selected categories?",
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
        categoryProgressRenderer: function (percentSpent, metaData, category, rowIndex, colIndex, store, view) {
            // The argument "metaData" is null when adding new records to the store.
            metaData = metaData || {};
            metaData.tdCls = metaData.tdCls || "";

            if (percentSpent > 0 && percentSpent <= 1) {
                metaData.tdCls += " status-ok";
            } else if (percentSpent > 1) {
                metaData.tdCls += " status-warning";
            } else {
                metaData.tdCls += " status-indifferent";
            }

            return Ext.util.Format.percent(percentSpent || 0, "0.00");
        },
        categoryColorRenderer: function (value, metaData, category, rowIndex, colIndex, store, view) {
            metaData = metaData || {};
            metaData.style = metaData.style || {};

            var colors, getColorIndex, colorIndex;
            colors = BudgetUI.chart.Themes.getThemeColors(BootConfig.ext.chartThemeName);

            getColorIndex = function (index, colors, level) {
                level = level || 0;
                index = index >= colors.length ? index - level - colors.length : index;

                if (index >= colors.length) {
                    return getColorIndex(index, colors, level + 1);
                } else {
                    return index;
                }
            };

            colorIndex = colors[rowIndex] ? rowIndex : getColorIndex(rowIndex, colors);
            metaData.style = Ext.String.format("background-color:{0};", colors[colorIndex]);
            return "";
        }
    });
})();
