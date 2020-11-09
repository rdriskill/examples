(function () {
    "use strict";

    Ext.define("BudgetUI.view.main.controller.Main", {
        extend: "Ext.app.ViewController",
        requires: [
            "BudgetUI.view.budget.BudgetGrid",
            "BudgetUI.view.budget.BudgetPanel",
            "BudgetUI.model.Budget",
            "BudgetUI.view.settings.SettingsPanel",
            "BudgetUI.view.authentication.LoginWindow"
        ],
        alias: "controller.main",
        listen: {
            controller: {
                "#": {
                    unmatchedroute: function (hash) {
                        throw Ext.String.format("Unmatched route with {0}", window.location.href);
                    }
                }
            }
        },
        routes: {
            "list/budgets": "onBudgetsRedirect",
            "new/budgets": "onBudgetRedirect",
            "view/budgets/:id1/:id2": "onCompareBudgetsRedirect",
            "view/budgets/:id": "onBudgetRedirect",
            "view/settings": "onSettingsRedirect",
            "auth/logout": "onLogoutRedirect"
        },
        onBeforeRender: function (panel, eOpts) {
            Ext.Loader.loadScript({
                url: "dist/build.js",
                onLoad: function () {
                    panel.getViewModel().set("build", Build);
                },
                onError: function () {
                    window.Build = {
                        "version": "?",
                        "revision": "?",
                        "date": "?"
                    };
                    panel.getViewModel().set("build", Build);
                }
            });
        },
        onRender: function () {
            if (!window.location.hash) {
                this.redirectTo("list/budgets");
            }
        },
        onBudgetsRedirect: function () {
            var references = this.getView().getReferences();
            references.appContent.removeAll(true);
            references.appContent.add(Ext.create("BudgetUI.view.budget.BudgetGrid", {
                flex: 1
            }));
        },
        onCompareBudgetsRedirect: function (id1, id2) {
            var ids, references, budgetStore, onStoreLoaded;
            ids = [id1, id2];
            references = this.getView().getReferences();
            budgetStore = Ext.StoreMgr.lookup("BudgetUI.store.Budget");
            references.appContent.removeAll(true);

            onStoreLoaded = function () {
                var budgetPanel, budgetModel;

                Ext.Array.each(ids, function (id) {
                    budgetPanel = Ext.create("BudgetUI.view.budget.BudgetPanel", {
                        flex: 1
                    });
                    budgetModel = budgetStore.findRecord("objectId", id, 0, false, true, true);

                    if (!budgetModel) {
                        throw Ext.String.format("Could not find '{0}' store record corresponding to the identifier '{1}'.", Ext.getClassName(budgetStore), id);
                    }

                    budgetPanel.getViewModel().set("budget", budgetModel);
                    references.appContent.add(budgetPanel);
                });
            };

            if (!budgetStore.isLoaded()) {
                budgetStore.load({
                    callback: onStoreLoaded
                });
            } else {
                onStoreLoaded();
            }
        },
        onBudgetRedirect: function (id) {
            var references, budgetPanel, budgetStore, onStoreLoaded, budgetModel;
            references = this.getView().getReferences();
            budgetPanel = Ext.create("BudgetUI.view.budget.BudgetPanel", {
                flex: 1
            });
            budgetStore = Ext.StoreMgr.lookup("BudgetUI.store.Budget");
            onStoreLoaded = function () {
                if (id) {
                    budgetModel = budgetStore.findRecord("objectId", id, 0, false, true, true);

                    if (!budgetModel) {
                        throw Ext.String.format("Could not find '{0}' store record corresponding to the identifier '{1}'.", Ext.getClassName(budgetStore), id);
                    }
                } else {
                    budgetModel = Ext.create("BudgetUI.model.Budget");
                    budgetStore.add(budgetModel);
                }

                references.appContent.removeAll(true);
                budgetPanel.getViewModel().set("budget", budgetModel);
                references.appContent.add(budgetPanel);
            };

            if (!budgetStore.isLoaded()) {
                budgetStore.load({
                    callback: onStoreLoaded
                });
            } else {
                onStoreLoaded();
            }
        },
        onSettingsRedirect: function () {
            var references = this.getView().getReferences();
            references.appContent.removeAll(true);
            references.appContent.add(Ext.create("BudgetUI.view.settings.SettingsPanel", {
                flex: 1
            }));
        },
        onLogoutRedirect: function () {
            var controller, user;
            controller = this;
            user = BudgetUI.model.User.getCurrentUser();

            if (user) {
                user.logout();
                controller.getView().destroy();

                Ext.create({
                    xtype: "loginWindow"
                });
            }
        },
        onBudgetsNavClick: function () {
            this.redirectTo("list/budgets");
        },
        onSettingsNavClick: function () {
            this.redirectTo("view/settings");
        },
        onLogOutNavClick: function () {
            this.redirectTo("auth/logout");
        }
    });
})();
