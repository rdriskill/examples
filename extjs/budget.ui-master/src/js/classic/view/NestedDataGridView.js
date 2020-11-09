(function () {
    "use strict";
    /**
     * Table view implementation that allows for grid panels to specify column
     * data indexes that refer to nested data in Ext.data.Model's.
     * @see Ext.view.Table
     */
    Ext.define("BudgetUI.view.NestedDataGridView", {
        extend: "Ext.view.Table",
        xtype: "nestedDataGridView",
        /**
         * Resolves nested data index references for the specified column and
         * record.References can refer to nested object literals or Ext.data.Model
         * instances.
         * @param {Ext.grid.column.Column} column
         * @param {Ext.data.Model} record
         * @return {String} fieldValue
         */
        getDataIndexValue: function (column, record) {
            var parts, fieldValue;
            if (column && column.dataIndex) {
                if (column.dataIndex && column.dataIndex.indexOf(".") !== -1) {
                    parts = column.dataIndex.split(".");
                    parts.forEach(function (part, index) {
                        if (index === 0) {
                            fieldValue = record.data[part];
                        } else if (fieldValue && fieldValue.isModel && fieldValue.get) {
                            fieldValue = fieldValue.get(part);
                        } else if (fieldValue && fieldValue[part]) {
                            fieldValue = fieldValue[part];
                        }
                    });
                } else {
                    fieldValue = record.data[column.dataIndex];
                }
            }

            return fieldValue;
        },
        /**
         * Injects the nested data index references with their resolved values
         * into Ext.data.Model.data so that the grid will render the proper values.
         * @param {Ext.grid.column.Column[]} columns
         * @param {Ext.data.Model} record
         * @return {string[]} injectedColumnIndexes
         */
        injectDataIndexes: function (columns, record) {
            var view, injectedColumnIndexes;
            view = this;
            injectedColumnIndexes = [];

            if (columns && record) {
                columns.forEach(function (column) {
                    if (column.dataIndex.indexOf(".") !== -1 && !record.data[column.dataIndex]) {
                        record.data[column.dataIndex] = view.getDataIndexValue(column, record);
                        injectedColumnIndexes.push(column.dataIndex);
                    }
                });
            }

            return injectedColumnIndexes;
        },
        /**
         * Removed previously injected data indexes.
         * @param {string[]} injectedDataIndexes
         */
        removeInjectedDataIndexes: function (injectedDataIndexes, record) {
            if (injectedDataIndexes) {
                injectedDataIndexes.forEach(function (fieldName) {
                    delete record.data[fieldName];
                });
            }
        },
        /**
         * @override
         */
        handleUpdate: function (store, record, operation, changedFieldNames) {
            var view, injectedDataIndexes, columns;
            view = this;
            columns = view.ownerCt.getVisibleColumnManager().getColumns();
            injectedDataIndexes = view.injectDataIndexes(columns, record);
            view.superclass.handleUpdate.apply(view, [store, record, operation, changedFieldNames]);
            view.removeInjectedDataIndexes(injectedDataIndexes, record);
        },
        /**
         * @override
         */
        renderCell: function (column, record, recordIndex, rowIndex, columnIndex, out) {
            var view, injectedDataIndexes;
            view = this;
            injectedDataIndexes = view.injectDataIndexes([column], record);
            view.superclass.renderCell.apply(view, [column, record, recordIndex, rowIndex, columnIndex, out]);
            view.removeInjectedDataIndexes(injectedDataIndexes, record);
        }
    });
})();
