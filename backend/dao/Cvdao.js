const Cv = require('../models/Cv');


async function saveCvInfo({ fileId, driveLink="", score=0,provider}) {
  const cv = new Cv({ fileId, driveLink, score,provider });
  await cv.save();
  return cv;
}
async function getCvs(provider) {
  const allCvs = await Cv.find({provider:provider});
  return allCvs;
}
async function getTopCvs() {
  const allCvs = await Cv.find().sort({ score: -1 });
  const topCount = Math.ceil(allCvs.length * 0.1);
  return allCvs.slice(0, topCount);
}

async function updateCvScore(fileId, score) {
  await Cv.findOneAndUpdate({ fileId }, { score }, { new: true });
}

async function getCvsToDelete() {
  const allCvs = await Cv.find().sort({ score: -1 });
  const topCount = Math.ceil(allCvs.length * 0.1);
  return allCvs.slice(topCount); 
}
async function checkAttachmentExists(filename) {
  const cv = await Cv.findOne({ fileId: filename });
  return cv !== null;
}


module.exports = {
  saveCvInfo,
  getTopCvs,
  getCvsToDelete,
  getCvs,
  checkAttachmentExists,
  updateCvScore
};
