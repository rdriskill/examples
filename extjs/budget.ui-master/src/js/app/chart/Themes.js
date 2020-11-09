(function () {
    "use strict";

    Ext.define("BudgetUI.chart.Themes", {
        singleton: true,
        requires: [
            "BudgetUI.chart.FlatTheme"
        ],
        getThemeAliases: function () {
            var themes = [];

            Ext.Object.each(Ext.chart.theme, function (key, value) {
                if (value.alias) {
                    themes.push({
                        name: key,
                        alias: (Array.isArray(value.alias) ? value.alias[0] : value.alias).split(".").pop()
                    });
                }
            });

            return themes;
        },
        getTheme: function (alias) {
            var themeAlias, theme;

            Ext.Object.each(Ext.chart.theme, function (key, value) {
                if (value.alias) {
                    themeAlias = (Array.isArray(value.alias) ? value.alias[0] : value.alias).split(".").pop();

                    if (themeAlias === alias) {
                        theme = value;
                        return false;
                    }
                }
            });

            return theme;
        },
        getThemeColors: function (alias) {
            var theme, colors;
            theme = BudgetUI.chart.Themes.getTheme(alias);
            colors = theme ? theme.getColors() : [];

            // Using a gradient theme. Pull out the starting color for each.
            if (colors.length > 0 && colors[0].stops) {
                Ext.Array.each(colors, function (color, index) {
                    colors[index] = color.stops[0].color;
                });
            }

            return colors;
        }
    });
})();
