const { rgb }= require('pdf-lib');
const config = require('./config.js');
const locale = require(`../locale/${config.LOCALE}.js`);

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

const COLORS= {
  BLACK: rgb(0.11, 0.11, 0.11),
  DARK_GRAY: rgb(0.44, 0.44, 0.44),
}

const drawTextBox= (page, form, fieldName, opts) => {
  textBox = form.createTextField(fieldName)
  textBox.setText(opts.selected)
  textBox.addToPage(page, { height: 10, width: 80, ...opts })
};

const drawHumanAttribute= (page, form, title, baseX, baseY, ddId) => {
  page.drawText(title, { x: baseX, y: baseY, size: 8, color: COLORS.BLACK })
  dropDown(page, form, ddId, locale.dots.oneToFive, {selected: 'o', x: baseX+50, y: baseY, width: 30, color: COLORS.DARK_GRAY})
};

const drawHumanSkill= (page, form, baseX, baseY, dots, title, category) => {
  const fieldName = `${category}.${title.toLowerCase()}`;
  page.drawText(title, { x: baseX, y: baseY, size: 8 , color: COLORS.DARK_GRAY })
  dropDown(page, form, fieldName, dots, {selected: '', x: baseX+50, y: baseY, width: 28, color: COLORS.DARK_GRAY})
};

const drawHumanCustomSkill= (page, form, baseX, baseY, dots, title, index, category) => {
  const fieldName = `${category}.${title.toLowerCase()}${index}`;
  page.drawText(title, { x: baseX, y: baseY, size: 8 , color: COLORS.DARK_GRAY })
  dropDown(page, form, fieldName, dots, {selected: '', x: baseX+50, y: baseY, width: 28, color: COLORS.DARK_GRAY})
};

const drawBackground = (page, form, baseX, baseY, title, index, category) => {
  const fieldName = `${category}.${title.toLowerCase()}${index}`;
  dropDown(page, form, `${fieldName}.ddl`, locale.backgrounds.backgroundList, { x: baseX, y: baseY, width: 50})
  dropDown(page, form, `${fieldName}.dots`, locale.dots.noneToFive, {selected: '', x: baseX+70, y: baseY, width: 28, color: COLORS.DARK_GRAY})
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
  drawHumanAttribute,
  drawHumanSkill,
  drawHumanCustomSkill,
  drawBackground,
  metadata,
  hline,
  checkBox,
  COLORS
}