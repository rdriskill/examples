(function () {
    "use strict";

    Ext.define("BudgetUI.view.authentication.RegisterWindow", {
        extend: "Ext.window.Window",
        xtype: "registerWindow",
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
            defaultButton: "registerButton",
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
                text: "Create an account"
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
                allowBlank: false,
                name: "email",
                emptyText: "user@example.com",
                vtype: "email",
                bind: "{user.email}"
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
                scale: "large",
                formBind: true,
                reference: "registerButton",
                bind: false,
                margin: "5 0",
                iconAlign: "right",
                text: "Register",
                listeners: {
                    click: "onRegisterBtnClick"
                }
            }]
        }]
    });
})();
