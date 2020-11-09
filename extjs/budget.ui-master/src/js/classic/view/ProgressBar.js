(function () {
    "use strict";

    Ext.define("BudgetUI.view.ProgressBar", {
        extend: "Ext.ProgressBar",
        alias: "widget.pbar",
        textTpl: "{value:percent('0.00')}",
        style: "background-color: #E8E8E8;",
        /**
         * Overriding this method to always use the configured 'textTpl' instead
         * of passing the 'text' value to 'updateProgress()'
         */
        updateValue: function (value) {
            this.updateProgress(value);
        },
        /**
         * Necessary to use view model binding on the text property.
         */
        setText: function (text) {
            this.updateText(text);
        },

        /**
         * Necessary to use view model binding on the cls property.
         */
        setCls: function (cls) {
            this.getEl().addCls(cls);
        }
    });
})();
