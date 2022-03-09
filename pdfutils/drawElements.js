module.exports = {
  HorizontalLine: function (doc, y) {
    doc.moveTo(5, y).lineTo(doc.page.width - 5, y).stroke();
  }
};