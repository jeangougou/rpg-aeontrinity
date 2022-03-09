const PDFDocument = require('pdfkit');
const fs = require('fs');
const config = require('./pdfutils/config.js');
const locale = require(`./locale/${config.LOCALE}.js`);
const Draw = require('./pdfutils/drawElements.js');

// Init
const doc = new PDFDocument;
doc.pipe(fs.createWriteStream(`${config.FILENAME}-${config.ITERATION}.pdf`));
doc.font(config.FONT);
doc.fontSize(10);
doc.initForm();

// Layout
let rootField = doc.formField('rootField');
let pgStats = doc.formField('pgStats', { parent: rootField });

// dettaglio personaggio
doc
 .text(locale.pgDetail.name, 5, 10, 0, 0, { lineBreak : false })
 .formText(locale.pgDetail.name, 60, 10, 80, 10, { parent: pgStats, value: '' });
doc
 .text(locale.pgDetail.origin, 145, 10, 0, 0, { lineBreak : false })
 .formCombo(locale.pgDetail.origin, 190, 10, 80, 10, { parent: pgStats, value: '', defaultValue: '', select: locale.pgDetail.originList, multiSelect:false, edit:true, sort:true });
doc
 .text(locale.pgDetail.aptitude, 275, 10, 0, 0, { lineBreak : false })
 .formCombo(locale.pgDetail.aptitude, 330, 10, 80, 10, { parent: pgStats, value: '', defaultValue: '', select: locale.pgDetail.aptitudeList, multiSelect:false, edit:true, sort:true });

doc
 .text(locale.pgDetail.series, 5, 25, 0, 0, { lineBreak : false })
 .formText(locale.pgDetail.series, 60, 25, 80, 10, { parent: pgStats, value: '' });
doc
 .text(locale.pgDetail.nature, 145, 25, 0, 0, { lineBreak : false })
 .formCombo(locale.pgDetail.nature, 190, 25, 80, 10, { parent: pgStats, value: '', defaultValue: '', select: locale.pgDetail.natureList, multiSelect:false, edit:true, sort:true });
doc
 .text(locale.pgDetail.allegiance, 275, 25, 0, 0, { lineBreak : false })
 .formCombo(locale.pgDetail.allegiance, 330, 25, 80, 10, { parent: pgStats, value: '', defaultValue: '', select: locale.pgDetail.allegianceList, multiSelect:false, edit:true, sort:true });

Draw.HorizontalLine(doc, 40);
// doc.moveTo(doc.page.margins.left, 15).lineTo(doc.page.width - doc.page.margins.right, 15).stroke();
//doc.page.width

// Finalize PDF file
doc.end();


// doc
//   .fontSize(10)
//   .text(`scheda AEon Trinity ${config.ITERATION}`, { lineBreak : true });
// doc.addPage();