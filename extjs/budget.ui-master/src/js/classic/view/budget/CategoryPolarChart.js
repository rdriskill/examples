(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.CategoryPolarChart", {
        extend: "Ext.chart.PolarChart",
        xtype: "categoryPolarChart",
        width: "100%",
        height: "100%",
        insetPadding: 0,
        innerPadding: 10,
        theme: BootConfig.ext.chartThemeName,
        interactions: [
            "rotate", "itemhighlight"
        ],
        series: [{
            type: "pie",
            animation: {
                easing: "easeOut",
                duration: 500
            },
            angleField: "available",
            radiusField: "name",
            clockwise: false,
            highlight: {
                margin: 10
            },
            style: {
                strokeStyle: "white",
                lineWidth: 1
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(record.get("name") + ": " + Ext.util.Format.usMoney(record.get("available")));
                }
            }
        }]
    });
})();
