(function () {
    "use strict";

    Ext.define("BudgetUI.model.User", {
        extend: "Ext.data.Model",
        idProperty: "objectId",
        identifier: "uuid",
        proxy: "user",
        requires: [
            "BudgetUI.proxy.ParseRootBase",
            "BudgetUI.proxy.User"
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
            name: "sessionToken",
            type: "string",
            persist: false
        }, {
            name: "username",
            type: "string"
        }, {
            name: "password",
            type: "string"
        }, {
            name: "email",
            type: "string"
        }],
        statics: {
            getCurrentUser: function () {
                var data, user;
                data = Ext.JSON.decode(localStorage.getItem("BudgetUI.auth.login"), true);

                if (data) {
                    if (BudgetUI.currentUser && BudgetUI.currentUser.get("sessionToken") !== data.sessionToken) {
                        BudgetUI.currentUser.destroy();
                        BudgetUI.currentUser = undefined;
                    }

                    if (BudgetUI.currentUser && BudgetUI.currentUser.destroyed || !BudgetUI.currentUser) {
                        user = Ext.create("BudgetUI.model.User", data);
                        BudgetUI.currentUser = user;

                    } else {
                        user = BudgetUI.currentUser;
                    }
                }

                return user;
            }
        },
        login: function (options) {
            options = options || {};
            var user, proxy, operation;
            user = this;

            proxy = Ext.create("BudgetUI.proxy.ParseRootBase", {
                url: "/login",
                model: "BudgetUI.model.User"
            });

            operation = proxy.createOperation("read", {
                params: {
                    username: user.get("username"),
                    password: user.get("password")
                },
                callback: function (records, operation, success) {
                    if (success) {
                        var result = Ext.JSON.decode(operation._response.responseText);
                        user.set(result);
                        localStorage.setItem("BudgetUI.auth.login", Ext.JSON.encode(user.getData()));
                    }

                    if (options.callback) {
                        options.callback(success);
                    }
                }
            });

            operation.execute();
        },
        registerNewUser: function (options) {
            options = options || {};
            var user;
            user = this;

            user.save({
                callback: function (record, operation, success) {
                    if (success) {
                        var result = Ext.JSON.decode(operation._response.responseText);
                        user.set(result);
                        localStorage.setItem("BudgetUI.auth.login", Ext.JSON.encode(user.getData()));
                    }

                    if (options.callback) {
                        options.callback(success);
                    }
                }
            });
        },
        logout: function (options) {
            options = options || {};
            var user, proxy, operation;
            user = this;

            // TODO This is parse.com specific and should be abstracted out.
            proxy = Ext.create("BudgetUI.proxy.ParseRootBase", {
                url: "/logout",
                model: "BudgetUI.model.User"
            });

            proxy.setHeaders(Ext.apply(proxy.getHeaders(), {
                "X-Parse-Session-Token": user.get("sessionToken")
            }));

            operation = proxy.createOperation("create", {
                callback: function (records, operation, success) {
                    if (options.callback) {
                        options.callback(success);
                    }
                }
            });

            operation.execute();
            localStorage.removeItem("BudgetUI.auth.login");
            user.destroy();
        }
    });
})();
