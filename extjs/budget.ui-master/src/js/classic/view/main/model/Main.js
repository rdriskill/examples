(function () {
    "use strict";

    Ext.define("BudgetUI.view.main.model.Main", {
        extend: "Ext.app.ViewModel",
        alias: "viewmodel.main",
        formulas: {
            appVersionContent: function (get) {
                var build = get("build");

                return Ext.String.format("Version: {0}<br/>Build: {1}<br/>Revision: {2}",
                    build.version, build.date, build.revision);
            }
        }
    });
})();
