module.exports = {
  dropDown: (page, form, dropDownName, optionsList, opts) => {
    const dropdown = form.createDropdown(dropDownName)
    dropdown.addOptions(optionsList)
    dropdown.disableMultiselect()
    dropdown.enableSorting()
    dropdown.enableEditing()
    dropdown.addToPage(page, { size: 10, height: 10, width: 80, borderWidth: 0, ...opts})
    if(undefined !== opts.selected)
      dropdown.select(opts.selected)
    return dropdown;
  },
  metadata: (doc) => {
    // Note that these fields are visible in the "Document Properties" section of most PDF readers.
    doc.setTitle('Æon Trinity Character sheet ')
    doc.setAuthor('Rebecca Bue Li')
    doc.setSubject('📘 An Epic Tale')
    doc.setKeywords(['Æon Trinity', 'rpg'])
    doc.setProducer('sponsored by The Ministry')
    doc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)')
    doc.setCreationDate(new Date('2120-06-02T01:52:27.342Z'))
  },
  hline: (page, y, color, thickness) => {
    thickness = thickness || 1;
    page.drawLine({start: {x:0,y}, end: {x: page.getWidth(), y}, color, thickness});
  }
}