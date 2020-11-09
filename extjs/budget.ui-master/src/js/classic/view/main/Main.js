(function () {
    "use strict";

    /**
     * This class is the main view for the application. It is specified in app.js as the "mainView" property. That setting automatically
     * applies the "viewport" plugin to promote that instance of this class to the body element.
     */
    Ext.define("BudgetUI.view.main.Main", {
        extend: "Ext.container.Container",
        requires: [
            "BudgetUI.view.main.controller.Main",
            "BudgetUI.view.main.model.Main"
        ],
        xtype: "app-main",
        plugins: "viewport",
        controller: "main",
        viewModel: "main",
        listeners: {
            render: "onRender",
            beforerender: "onBeforeRender"
        },
        layout: {
            type: "hbox",
            align: "stretch",
            pack: "start"
        },
        defaults: {
            padding: 10
        },
        items: [{
            xtype: "container",
            flex: 0.12,
            layout: "vbox",
            padding: 0,
            items: [{
                xtype: "container",
                id: "app-logo",
                flex: 0.15,
                width: "100%",
                style: {
                    backgroundColor: "#3892D3"
                },
                items: [{
                    xtype: "component",
                    align: "center",
                    width: "100%",
                    height: "100%"
                }]
            }, {
                xtype: "segmentedbutton",
                vertical: true,
                layout: "vbox",
                flex: 0.78,
                width: "100%",
                defaults: {
                    padding: 15,
                    width: "100%"
                },
                style: {
                    backgroundColor: "#282828"
                },
                items: [{
                    xtype: "button",
                    text: "Budgets",
                    pressed: true,
                    scale: "large",
                    handler: "onBudgetsNavClick"
                }, {
                    xtype: "button",
                    text: "Settings",
                    scale: "large",
                    handler: "onSettingsNavClick"
                }, {
                    xtype: "button",
                    text: "Log Out",
                    scale: "large",
                    handler: "onLogOutNavClick"
                }]
            }, {
                xtype: "container",
                id: "app-version",
                width: "100%",
                flex: 0.07,
                style: {
                    backgroundColor: "#282828"
                },
                bind: {
                    html: "{appVersionContent}"
                }
            }]
        }, {
            xtype: "container",
            reference: "appContent",
            id: "app-content",
            flex: 0.88,
            padding: 0,
            defaults: {
                padding: 10
            },
            layout: {
                type: "vbox",
                align: "stretch"
            },
            style: {
                backgroundColor: "#ECECEC"
            }
        }]
    });
})();
