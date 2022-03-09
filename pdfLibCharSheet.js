const { PDFDocument, StandardFonts, PDFForm }= require('pdf-lib');
const fs = require('fs');
const config = require('./pdfutils/config.js');
const locale = require(`./locale/${config.LOCALE}.js`);
const Draw = require('./pdfutils/drawElements.js');
const formUtils = require('./pdfutils/formUtils.js');


run().catch(err => console.log(err));

async function run() {
  // Create a new document and add a new page
  const doc = await PDFDocument.create();
  const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage();
  page.setFont(helveticaFont);
  page.setFontSize(10);

  // Get the form so we can add fields to it
  const form = doc.getForm()
  ////////////////////////
  // PG DETAILS
  ////////////////////////
  // name
  page.drawText(locale.pgDetail.name, { x: 10, y: page.getHeight() - 18 })//, size: 8
  const nameField = form.createTextField('pgDetail.name')
  nameField.setText('')
  nameField.addToPage(page, { x: 60, y: page.getHeight() - 20, height: 10, width: 80, borderWidth: 0 })
  // origin
  page.drawText(locale.pgDetail.origin, { x: 150, y: page.getHeight() - 18 })//, size: 8
  formUtils.dropDown(page, form, 'pgDetail.origin', locale.pgDetail.originList, { x: 190, y: page.getHeight() - 20})
  // aptitude
  page.drawText(locale.pgDetail.aptitude, { x: 280, y: page.getHeight() - 18 })//, size: 8
  formUtils.dropDown(page, form, 'pgDetail.aptitude', locale.pgDetail.aptitudeList, { x: 330, y: page.getHeight() - 20})

  // series
  page.drawText(locale.pgDetail.series, { x: 10, y: page.getHeight() - 33 })//, size: 8
  const seriesField = form.createTextField('pgDetail.series')
  seriesField.setText('')
  seriesField.addToPage(page, { x: 60, y: page.getHeight() - 35, height: 10, width: 80, borderWidth: 0 })
  // nature
  page.drawText(locale.pgDetail.nature, { x: 150, y: page.getHeight() - 33 })//, size: 8
  formUtils.dropDown(page, form, 'pgDetail.nature', locale.pgDetail.natureList, { x: 190, y: page.getHeight() - 35})
  // aptitude
  page.drawText(locale.pgDetail.allegiance, { x: 280, y: page.getHeight() - 33 })//, size: 8
  formUtils.dropDown(page, form, 'pgDetail.allegiance', locale.pgDetail.allegianceList, { x: 330, y: page.getHeight() - 35})




  // Note that these fields are visible in the "Document Properties" section of 
  // most PDF readers.
  doc.setTitle('🥚 The Life of an Egg 🍳')
  doc.setAuthor('Humpty Dumpty')
  doc.setSubject('📘 An Epic Tale of Woe 📖')
  doc.setKeywords(['eggs', 'wall', 'fall', 'king', 'horses', 'men'])
  doc.setProducer('PDF App 9000 🤖')
  doc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)')
  doc.setCreationDate(new Date('2018-06-24T01:58:37.228Z'))
  doc.setModificationDate(new Date('2019-12-21T07:00:11.000Z'))
  // Write the PDF to a file
  fs.writeFileSync(`${config.FILENAME}-${config.ITERATION}.pdf`, await doc.save());
}

// Example empty hello world page
// const text = "Hello World";
// const textWidth = helveticaFont.widthOfTextAtSize(text, 24);
// const textHeight = helveticaFont.heightAtSize(24);
// page.drawText(text, {
//   x: page.getWidth() / 2 - textWidth / 2,
//   y: page.getHeight() / 2 - textHeight / 2,
// });