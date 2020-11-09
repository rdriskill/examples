(function () {
    "use strict";

    var requires = [
        "BudgetUI.model.Budget"
    ];

    Ext.require(requires, function () {
        QUnit.module("BudgetUI.model.Budget");

        QUnit.test("categoryTotal", function (assert) {
            var data, expectedResult, model;
            data = [{
                budgetObjectId: "budget01",
                available: 1234.567
            }, {
                budgetObjectId: "budget01",
                available: 789.01
            }, {
                budgetObjectId: "budget01",
                available: undefined
            }];

            expectedResult = data.reduce(function (total, currentValue) {
                return total + (!isNaN(currentValue.available) ? currentValue.available : 0);
            }, 0);

            // Mock method returning the related store with test data.
            BudgetUI.model.Budget.prototype.getCategories = function () {
                var store = BudgetUI.store.BaseStore.getStoreByType("category", "budget01");
                store.loadData(data);
                return store;
            };

            model = Ext.create("BudgetUI.model.Budget", {
                objectId: "budget01"
            });

            assert.equal(model.get("categoryTotal"), expectedResult, Ext.String.format("equals the expected value of {0}", expectedResult));
        });

        QUnit.test("incomeTotal", function (assert) {
            var data, expectedResult, model;
            data = [{
                budgetObjectId: "budget01",
                amount: 1234.567
            }, {
                budgetObjectId: "budget01",
                amount: 789.01
            }, {
                budgetObjectId: "budget01",
                amount: undefined
            }];

            expectedResult = data.reduce(function (total, currentValue) {
                return total + (!isNaN(currentValue.amount) ? currentValue.amount : 0);
            }, 0);

            // Mock method returning the related store with test data.
            BudgetUI.model.Budget.prototype.getIncomes = function () {
                var store = BudgetUI.store.BaseStore.getStoreByType("income", "budget01");
                store.loadData(data);
                return store;
            };

            model = Ext.create("BudgetUI.model.Budget", {
                objectId: "budget01"
            });
            assert.equal(model.get("incomeTotal"), expectedResult, Ext.String.format("equals the expected value of {0}", expectedResult));
        });

        QUnit.test("transactionWithdrawalTotal", function (assert) {
            var data, expectedResult, model;
            data = [{
                budgetObjectId: "budget01",
                withdrawal: 1234.567
            }, {
                budgetObjectId: "budget01",
                withdrawal: 789.01
            }, {
                budgetObjectId: "budget01",
                withdrawal: undefined
            }];

            expectedResult = data.reduce(function (total, currentValue) {
                return total + (!isNaN(currentValue.withdrawal) ? currentValue.withdrawal : 0);
            }, 0);

            // Mock method returning the related store with test data.
            BudgetUI.model.Budget.prototype.getTransactions = function () {
                var store = BudgetUI.store.BaseStore.getStoreByType("transaction", "budget01");
                store.loadData(data);
                return store;
            };

            model = Ext.create("BudgetUI.model.Budget", {
                objectId: "budget01"
            });

            assert.equal(model.get("transactionWithdrawalTotal"), expectedResult, Ext.String.format("equals the expected value of {0}", expectedResult));
        });
    });
})();
