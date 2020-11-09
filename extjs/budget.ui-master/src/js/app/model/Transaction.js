(function () {
    "use strict";

    Ext.define("BudgetUI.model.Transaction", {
        extend: "Ext.data.Model",
        idProperty: "objectId",
        identifier: "uuid",
        proxy: "transaction",
        requires: [
            "BudgetUI.proxy.Transaction",
            "BudgetUI.store.BaseStore"
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
            name: "categoryObjectId",
            type: "string"
        }, {
            name: "accountObjectId",
            type: "string"
        }, {
            name: "transactionDate",
            type: "date",
            defaultValue: new Date()
        }, {
            name: "checkNumber",
            type: "string"
        }, {
            name: "description",
            type: "string"
        }, {
            name: "isReconciled",
            type: "boolean",
            defaultValue: false
        }, {
            name: "withdrawal",
            type: "number",
            defaultValue: 0
        }, {
            name: "deposit",
            type: "number",
            defaultValue: 0
        }, {
            name: "category",
            type: "auto",
            persist: false,
            calculate: function (data) {
                var store, model;

                if (data.budgetObjectId) {
                    store = BudgetUI.store.BaseStore.getStoreByType("category", data.budgetObjectId);
                    model = store.findRecord("objectId", data.categoryObjectId, 0, false, true, true);
                }

                if (!model) { // If not found in the store, fire an xhr request to load it.
                    model = Ext.create("BudgetUI.model.Category");

                    model.set({
                        objectId: data.categoryObjectId,
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
