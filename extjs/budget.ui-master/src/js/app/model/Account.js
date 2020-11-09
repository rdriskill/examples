(function () {
    "use strict";

    Ext.define("BudgetUI.model.Account", {
        extend: "Ext.data.Model",
        idProperty: "objectId",
        identifier: "uuid",
        proxy: "account",
        requires: [
            "BudgetUI.proxy.Account",
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
            type: "string",
            defaultValue: "Untitled"
        }, {
            name: "beginningBalance",
            type: "number",
            defaultValue: 0
        }, {
            name: "currentBalance",
            type: "number",
            persist: false,
            depends: ["objectId", "beginningBalance"],
            convert: function (value, model) {
                var result, transactionStore;
                result = 0;

                if (model.get("budgetObjectId")) {
                    transactionStore = BudgetUI.store.BaseStore.getStoreByType("transaction", model.get("budgetObjectId"));

                    transactionStore.initialLoad({
                        callback: function () {
                            transactionStore.each(function (transaction) {
                                if (transaction.get("accountObjectId") === model.get("objectId")) {
                                    result += (transaction.get("deposit") - transaction.get("withdrawal")) * -1;
                                }
                            });

                            result = model.get("beginningBalance") - result;

                            model.set("currentBalance", result, {
                                convert: false
                            });
                        }
                    });
                }

                return result;
            }
        }]
    });
})();
