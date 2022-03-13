const { rgb }= require('pdf-lib');
const dropDown = (page, form, dropDownName, optionsList, opts) => {
  const dropdown = form.createDropdown(dropDownName)
  dropdown.addOptions(optionsList)
  dropdown.disableMultiselect()
  dropdown.enableSorting()
  dropdown.enableEditing()
  dropdown.addToPage(page, { size: 10, height: 10, width: 80, borderWidth: 0, ...opts})
  if(undefined !== opts.selected)
    dropdown.select(opts.selected)
  return dropdown;
}

const drawTextBox= (page, form, fieldName, opts) => {
  textBox = form.createTextField(fieldName)
  textBox.setText(opts.selected)
  textBox.addToPage(page, { height: 10, width: 80, ...opts })
};

const drawAttribute= (page, form, title, baseX, baseY, ddId, ddlOpts) => {
  page.drawText(title, { x: baseX, y: baseY, size: 10 , color: rgb(0.11, 0.11, 0.11) })
  drawTextBox(page, form, `${ddId}Specialty`, { x: baseX+60, y: baseY, height:8, width: 50, size:8, borderWidth: 0 })
  dropDown(page, form, ddId, ddlOpts, {selected: 'o', x: baseX+115, y: baseY, width: 30, color: rgb(0.66, 0.66, 0.66)})
};

const drawSkill= (page, form, baseX, baseY, dots, title, category) => {
  const fieldName = `${category}.${title.toLowerCase()}`;
  page.drawText(title, { x: baseX, y: baseY, size: 8 , color: rgb(0.66, 0.66, 0.66) })
  drawTextBox(page, form, `${fieldName}Speciality`, { x: baseX + 50, y: baseY, height:8, width: 60, size:8, borderWidth: 0})
  dropDown(page, form, fieldName, dots, {selected: 'o', x: baseX+115, y: baseY, width: 28, color: rgb(0.66, 0.66, 0.66)})
};

const drawCustomSkill= (page, form, baseX, baseY, dots, title, index, category) => {
  const fieldName = `${category}.${title.toLowerCase()}${index}`;
  page.drawText(title, { x: baseX, y: baseY, size: 8 , color: rgb(0.66, 0.66, 0.66) })
  drawTextBox(page, form, `${fieldName}Speciality`, { x: baseX + 50, y: baseY, height:8, width: 60, size:8, borderWidth: 0})
  dropDown(page, form, fieldName, dots, {selected: 'o', x: baseX+115, y: baseY, width: 28, color: rgb(0.66, 0.66, 0.66)})
};

const metadata= (doc) => {
  // Note that these fields are visible in the "Document Properties" section of most PDF readers.
  doc.setTitle('Æon Trinity Character sheet ')
  doc.setAuthor('Rebecca Bue Li')
  doc.setSubject('📘 An Epic Tale')
  doc.setKeywords(['Æon Trinity', 'rpg'])
  doc.setProducer('sponsored by The Ministry')
  doc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)')
  doc.setCreationDate(new Date('2120-06-02T01:52:27.342Z'))
};

const hline= (page, y, color, thickness) => {
  thickness = thickness || 1;
  page.drawLine({start: {x:0,y}, end: {x: page.getWidth(), y}, color, thickness});
};

const checkBox= (page, form, baseX, baseY, fieldName) => {
  const checkBox = form.createCheckBox(fieldName)
  checkBox.addToPage(page, {
    x: baseX,
    y: baseY,
    width: 10,
    height: 10,
    // borderWidth: 0.3,
  })
};

module.exports = {
  dropDown,
  drawTextBox,
  drawAttribute,
  drawSkill,
  drawCustomSkill,
  metadata,
  hline,
  checkBox
}