const { saveEmailConfig, getEmailConfig,checkEmailExists } = require('../dao/emailConfig');
const { checkEmails } = require('../utils/getEmails');
const { parseCV } = require('../utils/cvParse');
const { ScoreCV } = require('../utils/gemini');
const { uploadCV } = require('../dao/GoogleDrivedao');
const {getCvsToDelete,getTopCvs,getCvs,updateCvScore} = require('../dao/Cvdao');
const fs = require('fs');


/*
  save email configuration
*/
const saveEmailConfigHandler = async (req, res) => {
  try {
    const { email, type, host, username, password } = req.body;
    if(checkEmailExists(email)){
      return res.status(400).json({error: 'Email already exists' });
    }
    const config = await saveEmailConfig(email, type, host, username, password);
    res.status(201).json({ message: 'Config saved successfully', config });
  } catch (error) {
    res.status(500).json({ message: 'Error saving config', error: error.message });
  }
};


/*
  fetch emails and get the CVs, 
  parse them,
  score them,
  upload top 10% to Google Drive,
  delete the rest,
  return the top 10% google drive links
*/
const startParsingHandler = async (req, res) => {
  const {username,email_subject, job_title,start_date,end_date,min_experience,education_level,languages,required_skills } = req.body;

  try {
    // get email configuration data from the db
    const config = await getEmailConfig(username);
    if (!config) {
      return res.status(404).json({ message: 'Email config not found' });
    }

    //  get the cvs from the email inbox
    const emailResult = await checkEmails(start_date, end_date, email_subject, config);

    if (!emailResult.savedEmails || emailResult.savedEmails.length === 0) {
      return res.status(200).json({ message: 'No new CVs found' });
    }

    // get the CVs from the database, parse it and score it
    const allCvs = await getCvs(config.email);
    const jobRequirements = { job_title, min_experience, education_level, languages, required_skills };

    for (const cv of allCvs) {
      if (cv.score && cv.score > 0) continue; 
      const text = await parseCV(cv.driveLink);
      const { score } = await ScoreCV(jobRequirements, text);
      await updateCvScore(cv.fileId, score);
      await cv.save();
    }

    // Upload top 10% to Google Drive
    const topCvs = await getTopCvs();

    const uploaded = [];
    for (const cv of topCvs) {
      if (cv.driveLink && cv.driveLink.includes("https://")) continue;

      const result = await uploadCV(cv.driveLink);
      cv.driveLink = result.link;
      await cv.save();
      uploaded.push({ fileId: cv.fileId, link: result.link, score: cv.score });
    }

    // Delete others locally 
    const toDelete = await getCvsToDelete();
    toDelete.forEach(cv => {
      try {
        fs.unlinkSync(cv.driveLink);
      } catch (err) {
        console.error("Error deleting file:", err.message);
      }
    });

    res.status(200).json({
      message: 'CVs parsed and scored',
      topCvs: uploaded
    });
  } catch (error) {
    res.status(500).json({ message: 'Error parsing CVs', error: error.message });
  }
};
module.exports = {
  saveEmailConfigHandler,
  startParsingHandler
};
