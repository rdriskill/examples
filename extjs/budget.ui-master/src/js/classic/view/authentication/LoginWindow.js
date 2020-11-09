(function () {
    "use strict";

    Ext.define("BudgetUI.view.authentication.LoginWindow", {
        extend: "Ext.window.Window",
        xtype: "loginWindow",
        controller: "authentication",
        cls: "login-window",
        closable: false,
        autoShow: true,
        resizable: false,
        header: false,
        maximized: true,
        modal: true,
        frameHeader: false,
        defaultFocus: "form",
        requires: [
            "BudgetUI.view.authentication.controller.Authentication"
        ],
        layout: {
            type: "vbox",
            align: "center",
            pack: "center"
        },
        items: [{
            xtype: "form",
            reference: "userForm",
            viewModel: "default",
            defaultFocus: "textfield:focusable:not([hidden]):not([disabled]):not([value])",
            defaultButton: "loginButton",
            autoComplete: true,
            bodyPadding: "20 20",
            header: false,
            width: 415,
            listeners: {
                render: "onFormRender"
            },
            layout: {
                type: "vbox",
                align: "stretch"
            },
            defaults: {
                margin: "5 0"
            },
            items: [{
                xtype: "label",
                text: "Login into your account"
            }, {
                xtype: "textfield",
                name: "username",
                bind: "{user.username}",
                height: 55,
                hideLabel: true,
                allowBlank: false,
                emptyText: "User Name"
            }, {
                xtype: "textfield",
                height: 55,
                hideLabel: true,
                emptyText: "Password",
                inputType: "password",
                name: "password",
                bind: "{user.password}",
                allowBlank: false
            }, {
                xtype: "button",
                reference: "loginButton",
                scale: "large",
                iconAlign: "right",
                text: "Login",
                formBind: true,
                listeners: {
                    click: "onLoginBtnClick"
                }
            }, {
                xtype: "button",
                scale: "large",
                iconAlign: "right",
                text: "Create Account",
                listeners: {
                    click: "onCreateAccountBtnClick"
                }
            }]
        }]
    });
})();
