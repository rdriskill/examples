(function () {
    "use strict";

    Ext.define("BudgetUI.form.AppThemeCombo", {
        extend: "Ext.form.field.ComboBox",
        alias: "widget.appThemeCombo",
        fieldLabel: "App Theme",
        displayField: "name",
        valueField: "value",
        store: Ext.create("Ext.data.Store", {
            fields: [
                "value", "name"
            ],
            data: [{
                value: "neptune",
                name: "Neptune"
            }, {
                value: "neptune-touch",
                name: "Neptune Touch"
            }, {
                value: "crisp",
                name: "Crisp"
            }, {
                value: "crisp-touch",
                name: "Crisp Touch"
            }, {
                value: "classic",
                name: "Classic"
            }, {
                value: "gray",
                name: "Gray"
            }, {
                value: "aria",
                name: "Aria"
            }, {
                value: "triton",
                name: "Triton"
            }],
            sorters: [{
                property: "name",
                direction: "ASC"
            }]
        }),
        value: BootConfig.ext.themeName,
        listeners: {
            select: function (combo) {
                localStorage.setItem("BudgetUI.ext.themeName", combo.getValue());
                location.reload();
            }
        }
    });
})();
