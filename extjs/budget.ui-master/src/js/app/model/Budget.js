(function () {
    "use strict";

    Ext.define("BudgetUI.model.Budget", {
        extend: "Ext.data.Model",
        idProperty: "objectId",
        identifier: "uuid",
        proxy: "budget",
        requires: [
            "BudgetUI.proxy.Budget",
            "BudgetUI.store.BaseStore",
            "BudgetUI.store.Account",
            "BudgetUI.store.Category",
            "BudgetUI.store.Income",
            "BudgetUI.store.Transaction"
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
            name: "beginDate",
            type: "date"
        }, {
            name: "endDate",
            type: "date"
        }, {
            name: "name",
            type: "string",
            defaultValue: "Untitled"
        }, {
            name: "incomeTotal",
            type: "number",
            persist: false,
            depends: [],
            convert: function (value, model) {
                var field, result, store, wasLoaded, getResult;
                field = this;
                result = 0;
                store = model.getIncomes();
                wasLoaded = store.isLoaded();

                getResult = function () {
                    result = store.sum("amount");
                    model.set(field.getName(), result, {
                        convert: false
                    });
                };

                store.initialLoad({
                    callback: function () {
                        getResult();

                        if (!wasLoaded) {
                            store.on("datachanged", getResult);
                            store.on("update", getResult);
                        }
                    }
                });

                return result;
            }
        }, {
            name: "categoryTotal",
            type: "number",
            persist: false,
            depends: [],
            convert: function (value, model) {
                var field, result, store, wasLoaded, getResult;
                field = this;
                result = 0;
                store = model.getCategories();
                wasLoaded = store.isLoaded();

                getResult = function () {
                    result = store.sum("available");
                    model.set(field.getName(), result, {
                        convert: false
                    });
                };

                store.initialLoad({
                    callback: function () {
                        getResult();

                        if (!wasLoaded) {
                            store.on("datachanged", getResult);
                            store.on("update", getResult);
                        }
                    }
                });

                return result;
            }
        }, {
            name: "categoryPercent",
            type: "number",
            persist: false,
            calculate: function (data) {
                var result, categoryTotal, incomeTotal;
                categoryTotal = data.categoryTotal;
                incomeTotal = data.incomeTotal;

                if (incomeTotal === 0 && categoryTotal > 0) {
                    result = (categoryTotal + 100) / (incomeTotal + 100);
                } else if (incomeTotal === 0 && categoryTotal === 0) {
                    result = 0;
                } else {
                    result = categoryTotal / incomeTotal;
                }

                return result;
            }
        }, {
            name: "transactionWithdrawalTotal",
            type: "number",
            persist: false,
            depends: [],
            convert: function (value, model) {
                var field, result, store, wasLoaded, getResult;
                field = this;
                result = 0;
                store = model.getTransactions();
                wasLoaded = store.isLoaded();

                getResult = function () {
                    result = store.sum("withdrawal");
                    model.set(field.getName(), result, {
                        convert: false
                    });
                };

                store.initialLoad({
                    callback: function () {
                        getResult();

                        if (!wasLoaded) {
                            store.on("datachanged", getResult);
                            store.on("update", getResult);
                        }
                    }
                });

                return result;
            }
        }, {
            name: "transactionWithdrawalPercent",
            type: "number",
            persist: false,
            calculate: function (data) {
                var result, transactionWithdrawalTotal, incomeTotal;
                transactionWithdrawalTotal = data.transactionWithdrawalTotal;
                incomeTotal = data.incomeTotal;

                if (incomeTotal === 0 && transactionWithdrawalTotal > 0) {
                    result = (transactionWithdrawalTotal + 100) / (incomeTotal + 100);
                } else if (incomeTotal === 0 && transactionWithdrawalTotal === 0) {
                    result = 0;
                } else {
                    result = transactionWithdrawalTotal / incomeTotal;
                }

                return result;
            }
        }],
        getAccounts: function () {
            return BudgetUI.store.BaseStore.getStoreByType("account", this.get("objectId"));
        },
        getCategories: function () {
            return BudgetUI.store.BaseStore.getStoreByType("category", this.get("objectId"));
        },
        getIncomes: function () {
            return BudgetUI.store.BaseStore.getStoreByType("income", this.get("objectId"));
        },
        getTransactions: function () {
            return BudgetUI.store.BaseStore.getStoreByType("transaction", this.get("objectId"));
        }
    });
})();
