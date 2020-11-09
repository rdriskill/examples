(function () {
    "use strict";

    Ext.define("BudgetUI.view.budget.CategoryBarChart", {
        extend: "Ext.chart.CartesianChart",
        xtype: "categoryBarChart",
        width: "100%",
        height: "100%",
        flipXY: true,
        insetPadding: 0,
        innerPadding: 10,
        padding: 0,
        theme: {
            type: "muted"
        },
        interactions: {
            type: "itemedit",
            style: {
                lineWidth: 1
            },
            tooltip: {
                renderer: function (tooltip, item, target, e) {
                    var record = item.record;
                    tooltip.setHtml(record.get("name") + ": " + Ext.util.Format.usMoney(record.get("available")));
                }
            }
        },
        animation: {
            easing: "easeOut",
            duration: 500
        },
        axes: [{
            type: "numeric",
            position: "bottom",
            fields: "available",
            grid: true,
            hidden: true,
            renderer: function (axis, label, layoutContext) {
                return Ext.util.Format.number(layoutContext.renderer(label), "0,000");
            }
        }, {
            type: "category",
            position: "left",
            fields: "name"
        }],
        series: [{
            type: "bar",
            xField: "name",
            yField: "available",
            style: {
                opacity: 0.80,
                minGapWidth: 5
            },
            highlightCfg: {
                strokeStyle: "black",
                radius: 10
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
