const u = require('./u.js');

const drawAttributeAndSkillBlock = (page, form, attributeName, baseX, baseY, attributeId, attributeDots, skillDots, customStringPlaceholder, skillNamesArr, customSkillsNumber) => {
  let lastY = baseY;
  u.drawAttribute(page, form, attributeName, baseX, baseY, `${attributeId}Speciality`, attributeId, attributeDots);
  const keys = Object.keys(skillNamesArr);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    u.drawSkill(page, form, baseX, baseY-(15*(i+1)), skillDots, skillNamesArr[key], `${attributeId}Skills`);
  }
  for (let i=0; i<customSkillsNumber; i++){
    u.drawCustomSkill(page, form, baseX, baseY-15*(keys.length+i+1), skillDots, customStringPlaceholder, i, `${attributeId}Skills`);
    lastY = baseY-15*(keys.length+i+1)
  }
  return lastY
};

const pgDetails= (page, form, locale, baseX, baseY) => {
  ////////////////////////
  // PG DETAILS
  ////////////////////////
  // name
  page.drawText(locale.name, { x: baseX, y: baseY })//, size: 8
  u.drawTextBox(page, form, 'pgDetail.name', { x: baseX + 50, y: baseY-2, height: 10, width: 80, borderWidth: 0 })
  // origin
  page.drawText(locale.origin, { x: baseX + 140, y: baseY })//, size: 8
  u.dropDown(page, form, 'pgDetail.origin', locale.originList, { x: baseX+180, y: baseY-2})
  // aptitude
  page.drawText(locale.aptitude, { x: baseX+270, y: baseY })//, size: 8
  u.dropDown(page, form, 'pgDetail.aptitude', locale.aptitudeList, { x: baseX+320, y: baseY-2})

  // series
  page.drawText(locale.series, { x: baseX, y: baseY-15 })//, size: 8
  u.drawTextBox(page, form, 'pgDetail.series', { x: baseX + 50, y: baseY-17, height: 10, width: 80, borderWidth: 0 })
  // nature
  page.drawText(locale.nature, { x: baseX + 140, y: baseY-15 })//, size: 8
  u.dropDown(page, form, 'pgDetail.nature', locale.natureList, { x: baseX+180, y: baseY-17})
  // aptitude
  page.drawText(locale.allegiance, { x: baseX+270, y: baseY-15 })//, size: 8
  u.dropDown(page, form, 'pgDetail.allegiance', locale.allegianceList, { x: baseX+320, y: baseY-17})

  // player
  page.drawText(locale.player, { x: baseX, y: baseY-30 })//, size: 8
  u.drawTextBox(page, form, 'pgDetail.player', { x: baseX + 50, y: baseY-32, height: 10, width: 80, borderWidth: 0 })
  // exp
  page.drawText(locale.experience, { x: baseX+ 140, y: baseY-30 })//, size: 8
  u.drawTextBox(page, form, 'pgDetail.experience.current', { x: baseX + 200, y: baseY-30, height: 10, width: 40, borderWidth: 0 })
  page.drawText("/", { x: baseX+ 241, y: baseY-30 })//, size: 8
  u.drawTextBox(page, form, 'pgDetail.experience.total', { x: baseX + 244, y: baseY-30, height: 10, width: 40, borderWidth: 0 })
};
const drawPsionHealthLevel= (page, form, locale, baseX, baseY, malusLevels) => {
  let lastY = baseY;

  const keys = Object.keys(locale);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    page.drawText(locale[key], { x: baseX, y: baseY-(15*(i+1)) })
    page.drawText(`${malusLevels[i]}`, { x: baseX+70, y: baseY-(15*(i+1)) })

    u.checkBox(page, form, baseX+95, baseY-(15*(i+1)), `health.level.${key}.bruised`);
    u.checkBox(page, form, baseX+110, baseY-(15*(i+1)), `health.level.${key}.lethal`);
    lastY = baseY-15*(keys.length+i+1)
  }
  // healtLevels
  return lastY
};
module.exports = {
  pgDetails,
  drawAttributeAndSkillBlock,
  drawPsionHealthLevel,

  _noop: () =>{}
};