(function () {
    "use strict";

    Ext.define("BudgetUI.store.BaseStore", {
        extend: "Ext.data.Store",
        pageSize: 1000,
        statics: {
            /**
             * Retrieve store by type/alias. Store id is set to the format "store.{storeType}.{parentObjectId}"
             * so that stores representing different parent's can coexist. The parent object id is included in the
             * new store's configuration so that it can be used in load operations.
             */
            getStoreByType: function (storeType, parentObjectId) {
                var model, storeId, store;
                model = this;

                if (storeType && parentObjectId) {
                    storeId = Ext.String.format("store.{0}.{1}", storeType, parentObjectId);
                    store = Ext.StoreMgr.lookup(storeId);

                    if (!store) {
                        store = Ext.Factory.store({
                            type: storeType,
                            storeId: storeId,
                            parentObjectId: parentObjectId
                        });
                    }
                } else {
                    throw "Store type and parent object id must be specified when retrieving store.";
                }

                return store;
            }
        },
        listeners: {
            /**
             * When the store's proxy performs an operation successfully, update
             * the related records when data returned from the server.
             */
            write: function (store, operation) {
                if (Ext.getClassName(operation) === "Ext.data.operation.Create") {
                    var response, result;
                    response = operation._response;
                    result = Ext.util.JSON.decode(response.responseText);

                    if (result && operation.getRecords()) {
                        Ext.Array.each(operation.getRecords(), function (record) {
                            if (record) {
                                Ext.Object.each(result, function (key, value) {
                                    record.set(key, value);
                                });

                                record.set("updatedAt", record.get("createdAt"));
                            }
                        });
                    }
                }
            },
            /**
             * Checks for previously configured parent object id's for use with load operations.
             */
            beforeload: function (store, operation, eOpts) {
                if (store.parentObjectId) { // Parse specific parameters
                    operation.setParams({
                        where: Ext.encode({
                            budgetObjectId: store.parentObjectId
                        }),
                        skip: (operation._page - 1) * store.getPageSize(),
                        limit: store.getPageSize()
                    });
                }
            }
        },
        /**
         * This method checks if the store has been or is currently being loaded. If either
         * is true, the store is not loaded.
         */
        initialLoad: function (options) {
            var store, doCallback;
            store = this;
            options = options || {};

            doCallback = function () {
                if (options.callback) {
                    options.callback();
                }
            };

            if (!store.isLoaded() && !store.isLoading()) {
                store.load({
                    callback: doCallback
                });
            } else if (store.isLoading()) {
                store.on("load", doCallback, store, {
                    single: true
                });
            } else {
                doCallback();
            }
        }
    });
})();
