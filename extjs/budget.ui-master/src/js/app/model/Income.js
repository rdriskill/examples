(function () {
    "use strict";

    Ext.define("BudgetUI.model.Income", {
        extend: "Ext.data.Model",
        idProperty: "objectId",
        identifier: "uuid",
        proxy: "category",
        requires: [
            "BudgetUI.proxy.Income",
            "BudgetUI.store.BaseStore",
            "BudgetUI.model.Account"
        ],
        fields: [{
            name: "objectId",
            type: "string"
        }, {
            name: "createdAt",
            type: "date"
        }, {
            name: "updatedAt",
            type: "date"
        }, {
            name: "budgetObjectId",
            type: "string"
        }, {
            name: "accountObjectId",
            type: "string"
        }, {
            name: "source",
            type: "string"
        }, {
            name: "amount",
            type: "number"
        }, {
            name: "receivingDate",
            type: "date"
        }, {
            name: "account",
            type: "auto",
            persist: false,
            calculate: function (data) {
                var store, model;

                if (data.budgetObjectId) {
                    store = BudgetUI.store.BaseStore.getStoreByType("account", data.budgetObjectId);
                    model = store.findRecord("objectId", data.accountObjectId, 0, false, true, true);
                }

                if (!model) { // If not found in the store, fire an xhr request to load it.
                    model = Ext.create("BudgetUI.model.Account");

                    model.set({
                        objectId: data.accountObjectId,
                        budgetObjectId: data.budgetObjectId
                    });

                    model.load({
                        callback: function (record, operation, success) {
                            var result = Ext.JSON.decode(operation._response.responseText);
                            record.set(result);
                        }
                    });
                }

                return model;
            }
        }]
    });
})();
