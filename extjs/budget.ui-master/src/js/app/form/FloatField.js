(function () {
    "use strict";

    /**
     * An extension of "Ext.form.field.Number" that forces decimal precision.
     * Useful for currency amounts where dollar symbols and commas are not required.
     */
    Ext.define("BudgetUI.form.FloatField", {
        extend: "Ext.form.field.Number",
        alias: "widget.floatfield",
        hideTrigger: true,
        keyNavEnabled: false,
        mouseWheelEnabled: false,

        /**
         * Utility method for determining the correct contextual precision.
         */
        getPrecision: function () {
            return !this.allowDecimals || this.decimalPrecision <= 0 ? 0 : this.decimalPrecision;
        },

        /**
         * Returns the form field value with the configured decimal precision enforced.
         */
        fixPrecision: function (value) {
            var me, nan;
            me = this;
            nan = isNaN(value);

            if (nan || !value) {
                return nan ? "" : value;
            }

            return Number(parseFloat(value)).toFixed(me.getPrecision());
        },

        /**
         * Sets the form field value "onBlur" with the configured decimal precision enforced.
         */
        onBlur: function (e) {
            var me, value;
            me = this;
            value = me.fixPrecision(me.getRawValue());

            me.superclass.onBlur.apply(me, [e]);

            if (!Ext.isEmpty(value)) {
                me.setRawValue(value);
            }
        }
    });
})();
