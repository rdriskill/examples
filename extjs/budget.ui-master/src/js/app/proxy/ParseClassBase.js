(function () {
    "use strict";

    /** Serves as a base proxy and abstraction layer for use with Facebook's Parse backend.
     * {@link https://parse.com}
     */
    Ext.define("BudgetUI.proxy.ParseClassBase", {
        extend: "Ext.data.proxy.Rest",
        alias: "proxy.parseClass",
        constructor: function (config) {
            Ext.apply(config, {
                useDefaultXhrHeader: false,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Parse-Application-Id": "mBaFTzxibcsQ2fGIZMJzNewYAHHip4Q9Ct1Uhdbd",
                    "X-Parse-REST-API-Key": "lvTXPp3qJvCP69tSlahRFwemv2YJ9N1ZlhU0yfFv"
                },
                reader: {
                    type: "json",
                    rootProperty: "results"
                },
                writer: {
                    type: "json",
                    writeRecordId: false,
                    writeAllFields: true,
                    // Sends the server dates in the format "1962-06-17T09:21:34.125Z"
                    dateFormat: "C"
                }
            });

            // Fulling qualifing the URL so that subordinate components do not need to know the domain.
            config.url = Ext.String.format("https://api.parse.com/1/classes{0}", config.url);

            Ext.data.proxy.Rest.superclass.constructor.apply(this, [
                config
            ]);
        }
    });
})();
