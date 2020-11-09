(function () {
    "use strict";

    Ext.define("BudgetUI.view.authentication.controller.Authentication", {
        extend: "Ext.app.ViewController",
        alias: "controller.authentication",
        requires: [
            "BudgetUI.model.User",
            "BudgetUI.view.authentication.RegisterWindow"
        ],
        onLoginSuccess: function () {
            this.getView().destroy();

            Ext.create({
                xtype: "app-main"
            });

            this.redirectTo("list/budgets");
        },
        onLoginBtnClick: function () {
            var controller, userForm, user;
            controller = this;
            userForm = controller.getReferences().userForm;
            user = userForm.getViewModel().get("user");

            user.login({
                callback: function (isSuccess) {
                    if (isSuccess) {
                        controller.onLoginSuccess();
                    } else {
                        userForm.getForm().markInvalid([{
                            field: "username",
                            message: "User name or password incorrect."
                        }, {
                            field: "password",
                            message: "User name or password incorrect."
                        }]);
                    }
                }
            });
        },
        onCreateAccountBtnClick: function () {
            this.getView().destroy();

            Ext.create({
                xtype: "registerWindow"
            });
        },
        onFormRender: function () {
            this.getReferences().userForm.getViewModel().set("user", Ext.create("BudgetUI.model.User"));
        },
        onRegisterBtnClick: function () {
            var controller, userForm, user;
            controller = this;
            userForm = controller.getReferences().userForm;
            user = userForm.getViewModel().get("user");

            user.registerNewUser({
                callback: function () {
                    controller.onLoginSuccess();
                }
            });
        }
    });
})();
