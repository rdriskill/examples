(function () {
    "use strict";

    Ext.define("BudgetUI.model.Category", {
        extend: "Ext.data.Model",
        idProperty: "objectId",
        identifier: "uuid",
        proxy: "category",
        requires: [
            "BudgetUI.proxy.Category",
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
            name: "name",
            defaultValue: "Untitled"
        }, {
            name: "available",
            type: "number",
            defaultValue: 0
        }, {
            name: "spent",
            type: "number",
            persist: false,
            depends: ["budgetObjectId", "objectId"],
            convert: function (value, model) {
                var result, transactionStore;
                result = 0;

                if (model.get("budgetObjectId")) {
                    transactionStore = BudgetUI.store.BaseStore.getStoreByType("transaction", model.get("budgetObjectId"));

                    transactionStore.initialLoad({
                        callback: function () {
                            transactionStore.each(function (transaction) {
                                if (transaction.get("categoryObjectId") === model.get("objectId")) {
                                    result += transaction.get("withdrawal");
                                }
                            });
                            model.set("spent", result, {
                                convert: false
                            });
                        }
                    });
                }

                return result;
            }
        }, {
            name: "percentSpent",
            type: "number",
            persist: false,
            calculate: function (data) {
                var result, spent, available;
                result = 0;
                spent = data.spent;
                available = data.available;

                if (available === 0 && spent > 0) {
                    result = (spent + 100) / (available + 100);
                } else if (available === 0 && spent === 0) {
                    result = 0.00;
                } else {
                    result = spent / available;
                }

                return result;
            }
        }, {
            name: "remaining",
            type: "number",
            persist: false,
            calculate: function (data) {
                return data.available - data.spent;
            }
        }]
    });
})();
