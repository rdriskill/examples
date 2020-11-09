(function () {
    "use strict";

    Ext.require("BudgetUI.chart.Themes", function () {
        Ext.define("BudgetUI.form.ChartThemeCombo", {
            extend: "Ext.form.field.ComboBox",
            alias: "widget.chartThemeCombo",
            fieldLabel: "Chart Theme",
            displayField: "name",
            valueField: "alias",
            store: Ext.create("Ext.data.Store", {
                fields: [
                    "alias", "name"
                ],
                data: BudgetUI.chart.Themes.getThemeAliases(),
                sorters: [{
                    property: "name",
                    direction: "ASC"
                }]
            }),
            value: BootConfig.ext.chartThemeName,
            listeners: {

                select: function (combo) {
                    localStorage.setItem("BudgetUI.ext.chartThemeName", combo.getValue());
                    location.reload();
                }
            }
        });
    });
})();
