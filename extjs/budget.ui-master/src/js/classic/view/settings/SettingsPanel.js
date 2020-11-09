(function () {
    "use strict";

    Ext.define("BudgetUI.view.settings.SettingsPanel", {
        extend: "Ext.panel.Panel",
        xtype: "settingsPanel",
        title: "Settings",
        defaults: {
            padding: 10,
            labelWidth: 150
        },
        requires: [
            "BudgetUI.form.AppThemeCombo",
            "BudgetUI.form.ChartThemeCombo"
        ],
        items: [{
            xtype: "appThemeCombo"
        }, {
            xtype: "chartThemeCombo"
        }, {
            xtype: "checkbox",
            fieldLabel: "Developer Mode",
            value: BootConfig.devMode,
            listeners: {
                change: function (checkbox, newValue, oldValue, eOpts) {
                    localStorage.setItem("BudgetUI.devMode", newValue);
                    location.reload();
                }
            }
        }]
    });
})();
