(function () {
    "use strict";

    Ext.define("BudgetUI.chart.FlatTheme", {
        extend: "Ext.chart.theme.Base",
        singleton: true,
        alias: "chart.theme.flat",
        constructor: function (config) {
            // Register theme with Global ExtJS object literal.
            Ext.chart.theme.Flat = this;

            Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
                colors: [
                    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22",
                    "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
                ]
            }, config));
        }
    });
})();
