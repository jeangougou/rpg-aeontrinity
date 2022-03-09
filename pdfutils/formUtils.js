module.exports = {
  dropDown: (page, form, dropDownName, optionsList, opts) => {
    const originField = form.createDropdown(dropDownName)
    originField.addOptions(optionsList)
    originField.disableMultiselect()
    originField.enableSorting()
    originField.enableEditing()
    originField.addToPage(page, { ...opts,
      size: 10, height: 10, width: 80, borderWidth: 0 })
    return originField;
  }
}