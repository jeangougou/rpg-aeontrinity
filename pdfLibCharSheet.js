const { PDFDocument, StandardFonts, rgb }= require('pdf-lib');
const fs = require('fs');
const config = require('./pdfutils/config.js');
const locale = require(`./locale/${config.LOCALE}.js`);
const u = require('./pdfutils/u.js');
const blockDrawer = require('./pdfutils/blockDrawer.js');

const Layout = {
  col1x: 10,
  col2x: 110,
  col3x: 220,
  col4x: 310,

  yTopHeader: (page) => {return page.getHeight() - 18;},
  yLineTopHeaderSeparator: (page) => {return page.getHeight() - 54;},
  yRowSkillCategory:  (page) => {return page.getHeight() - 65;},
  yRowSkills:  (page) => {return page.getHeight() - 80;},
}

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
  blockDrawer.pgDetails(page, form, locale.pgDetail, Layout.col1x, Layout.yTopHeader(page));
  u.hline(page, Layout.yLineTopHeaderSeparator(page), blockDrawer.COLORS.DARK_GRAY);

  // skills
  page.drawText(locale.physicals.__title, { x: Layout.col1x, y: Layout.yRowSkillCategory(page), color: blockDrawer.COLORS.DARK_GRAY })
  let lastY=0;
  lastY =  blockDrawer.drawAttributeAndSkillBlock(
    page, //page
    form, //form
    locale.physicals.strength, //attributeName
    Layout.col1x, //baseX
    Layout.yRowSkills(page), //baseY
    'physicals.strength', //attributeId
    locale.customString, // customStringPlaceHolder
    locale.physicals.strengthSkills, // skillNamesArr
    1 //customSkillsNumber
  );
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.physicals.dexterity, Layout.col1x, lastY-15, 'physicals.dexterity', locale.customString, locale.physicals.dexteritySkills, 1);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.physicals.stamina, Layout.col1x, lastY-15, 'physicals.stamina', locale.customString, locale.physicals.staminaSkills, 1);

  page.drawText(locale.mentals.__title, { x: Layout.col2x, y: Layout.yRowSkillCategory(page), color: blockDrawer.COLORS.DARK_GRAY })
  lastY = 0;
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.mentals.perception, Layout.col2x, Layout.yRowSkills(page), 'mentals.perception',  locale.customString, locale.mentals.perceptionSkills, 1);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.mentals.intelligence, Layout.col2x, lastY-15, 'mentals.intelligence',  locale.customString, locale.mentals.intelligenceSkills, 1);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.mentals.wits, Layout.col2x, lastY-15, 'mentals.wits', locale.customString, locale.mentals.witsSkills, 1);


  page.drawText(locale.socials.__title, { x: Layout.col3x, y: Layout.yRowSkillCategory(page), color: blockDrawer.COLORS.DARK_GRAY })
  lastY = 0;
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.socials.appearance, Layout.col3x, Layout.yRowSkills(page), 'socials.appearance',  locale.customString, locale.socials.appearanceSkills, 1);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.socials.manipulation, Layout.col3x, lastY-15, 'socials.manipulation',  locale.customString, locale.socials.manipulationSkills, 1);
  lastY = blockDrawer.drawAttributeAndSkillBlock(page, form, locale.socials.charisma, Layout.col3x, lastY-15, 'socials.charisma',  locale.customString, locale.socials.charismaSkills, 1);
// =========================

  // health
  page.drawText(locale.health.__title, { x: Layout.col4x, y: Layout.yRowSkillCategory(page), color: blockDrawer.COLORS.DARK_GRAY })
  lastY = 0;
  lastY = blockDrawer.drawPsionHealthLevel(page, form, locale.health.healtLevels, Layout.col4x, Layout.yRowSkills(page)+15, [0,-1,-1,-2,-3,-4,'','']);

  // backgrounds
  page.drawText(locale.backgrounds.__title, { x: Layout.col4x, y: lastY+100, color: blockDrawer.COLORS.DARK_GRAY });
  lastY = blockDrawer.drawBackgrounds(page, form, locale.backgrounds.backgroundList, Layout.col4x, lastY+95, 7);

  u.metadata(doc);
  // Write the PDF to a file
  fs.writeFileSync(`${config.FILENAME}-${config.ITERATION}.pdf`, await doc.save());
}