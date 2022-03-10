const { PDFDocument, StandardFonts, rgb }= require('pdf-lib');
const fs = require('fs');
const config = require('./pdfutils/config.js');
const locale = require(`./locale/${config.LOCALE}.js`);
const u = require('./pdfutils/u.js');
const blockDrawer = require('./pdfutils/blockDrawer.js');

const Layout = {
  col1x: 10,
  col2x: 170,
  col3x: 320,
}

run().catch(err => console.log(err));
async function run() {
  // Create a new document and add a new page
  const doc = await PDFDocument.create();
  const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage();
  page.setFont(helveticaFont);
  page.setFontSize(10);
  
  
  const drawPhysicals = (page, form, locale) => {
    
  };
  // Get the form so we can add fields to it
  const form = doc.getForm()
  // top section
  blockDrawer.pgDetails(page, form, locale.pgDetail, Layout.col1x, page.getHeight() - 18);
  u.hline(page, page.getHeight() - 38, rgb(0.66, 0.66, 0.66));

  // skills
  // drawPhysicals (page, form, locale);
  page.drawText(locale.physicals.__title, { x: Layout.col1x, y: page.getHeight() - 50, color: rgb(0.66, 0.66, 0.66) })
  let lastY=0;
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.physicals.strength, Layout.col1x, page.getHeight() - 65, 'physicals.strength', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.physicals.strengthSkills, 1);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.physicals.dexterity, Layout.col1x, lastY-15, 'physicals.dexterity', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.physicals.dexteritySkills, 2);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.physicals.stamina, Layout.col1x, lastY-15, 'physicals.stamina', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.physicals.staminaSkills, 2);

  page.drawText(locale.mentals.__title, { x: Layout.col2x, y: page.getHeight() - 50, color: rgb(0.66, 0.66, 0.66) })
  lastY = 0;
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.mentals.perception, Layout.col2x, page.getHeight() - 65, 'mentals.perception', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.mentals.perceptionSkills, 1);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.mentals.intelligence, Layout.col2x, lastY-15, 'mentals.intelligence', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.mentals.intelligenceSkills, 2);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.mentals.wits, Layout.col2x, lastY-15, 'mentals.wits', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.mentals.witsSkills, 1);


  page.drawText(locale.socials.__title, { x: Layout.col3x, y: page.getHeight() - 50, color: rgb(0.66, 0.66, 0.66) })
  lastY = 0;
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.socials.appearance, Layout.col3x, page.getHeight() - 65, 'socials.appearance', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.socials.appearanceSkills, 1);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.socials.manipulation, Layout.col3x, lastY-15, 'socials.manipulation', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.socials.manipulationSkills, 2);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.socials.charisma, Layout.col3x, lastY-15, 'socials.charisma', locale.dots.oneToFive, locale.dots.oneToFive, locale.customString, locale.socials.charismaSkills, 1);



  u.metadata(doc);
  // Write the PDF to a file
  fs.writeFileSync(`${config.FILENAME}-${config.ITERATION}.pdf`, await doc.save());
}