const { PDFDocument, StandardFonts, rgb }= require('pdf-lib');
const fs = require('fs');
const config = require('./pdfutils/config.js');
const locale = require(`./locale/${config.LOCALE}.js`);

const u = require('./pdfutils/u.js');
const Layout = {
  col1x: 10,
  col2x: 150,
  col3x: 280,
}


const drawPgDetails = (page, form, locale) => {
  ////////////////////////
  // PG DETAILS
  ////////////////////////
  // name
  page.drawText(locale.pgDetail.name, { x: Layout.col1x, y: page.getHeight() - 18 })//, size: 8
  const nameField = form.createTextField('pgDetail.name')
  nameField.setText('')
  nameField.addToPage(page, { x: 60, y: page.getHeight() - 20, height: 10, width: 80, borderWidth: 0 })
  // origin
  page.drawText(locale.pgDetail.origin, { x: Layout.col2x, y: page.getHeight() - 18 })//, size: 8
  u.dropDown(page, form, 'pgDetail.origin', locale.pgDetail.originList, { x: 190, y: page.getHeight() - 20})
  // aptitude
  page.drawText(locale.pgDetail.aptitude, { x: Layout.col3x, y: page.getHeight() - 18 })//, size: 8
  u.dropDown(page, form, 'pgDetail.aptitude', locale.pgDetail.aptitudeList, { x: 330, y: page.getHeight() - 20})

  // series
  page.drawText(locale.pgDetail.series, { x: Layout.col1x, y: page.getHeight() - 33 })//, size: 8
  const seriesField = form.createTextField('pgDetail.series')
  seriesField.setText('')
  seriesField.addToPage(page, { x: 60, y: page.getHeight() - 35, height: 10, width: 80, borderWidth: 0 })
  // nature
  page.drawText(locale.pgDetail.nature, { x: Layout.col2x, y: page.getHeight() - 33 })//, size: 8
  u.dropDown(page, form, 'pgDetail.nature', locale.pgDetail.natureList, { x: 190, y: page.getHeight() - 35})
  // aptitude
  page.drawText(locale.pgDetail.allegiance, { x: Layout.col3x, y: page.getHeight() - 33 })//, size: 8
  u.dropDown(page, form, 'pgDetail.allegiance', locale.pgDetail.allegianceList, { x: 330, y: page.getHeight() - 35})
};

const drawPhysicals = (page, form, locale) => {
  page.drawText(locale.physicals.__title, { x: Layout.col1x, y: page.getHeight() - 50, color: rgb(0.33, 0.33, 0.33) })

  page.drawText(locale.physicals.strength, { x: Layout.col1x, y: page.getHeight() - 65, size: 8 , color: rgb(0.33, 0.33, 0.33) })
  u.dropDown(page, form, 'physicals.strength', locale.dots.oneToFive, {selected: 'o', x: Layout.col1x+50, y: page.getHeight() - 67, width: 30, color: rgb(0.33, 0.33, 0.33)})

};
const drawMentals = (page, form, locale) => {
  page.drawText(locale.mentals.__title, { x: Layout.col2x, y: page.getHeight() - 50, color: rgb(0.33, 0.33, 0.33) })
};
const drawSocials = (page, form, locale) => {
  page.drawText(locale.socials.__title, { x: Layout.col3x, y: page.getHeight() - 50, color: rgb(0.33, 0.33, 0.33) })
};

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
  // top section
  drawPgDetails(page, form, locale);
  
  u.hline(page, page.getHeight() - 38, rgb(0.33, 0.33, 0.33));
  // skills
  drawPhysicals (page, form, locale);
  drawMentals (page, form, locale);
  drawSocials (page, form, locale);
  
  // page.drawText(locale.physical.__title, { x: Layout.col2x, y: page.getHeight() - 50, color: rgb(0.33, 0.33, 0.33) })





  u.metadata(doc);
  // Write the PDF to a file
  fs.writeFileSync(`${config.FILENAME}-${config.ITERATION}.pdf`, await doc.save());
}