export default class MaterializeEvents {
  static initTable(tableId) {
        // Initialize the table heading checkbox to check or uncheck all other rows
    $(`#${tableId} thead tr th input[type="checkbox"]`).change(function () {
      if ($(this).is(':checked')) {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .find('tr td input[type="checkbox"]')
          .prop('checked', true)
          .change();
      } else {
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .find('tr td input[type="checkbox"]')
          .prop('checked', false)
          .change();
      }
    });

        // Initalize the table body checkboxes to change the tr background when checked or unchecked.
    $(`#${tableId} tbody tr td input[type="checkbox"]`).change(function () {
      if ($(this).is(':checked')) {
        $(this).closest('tr').addClass('selected');
      } else {
        $(this).closest('tr').removeClass('selected');
      }
    });
  }

  static initSideNav() {
    $('.button-collapse').sideNav();
  }
}
