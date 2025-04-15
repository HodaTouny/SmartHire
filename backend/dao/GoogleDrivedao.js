const fs = require('fs');
const path = require('path');
const { connectGoogleDrive } = require('../dbConfig/googledrive');

async function uploadCV(filePath) {
  const drive = await connectGoogleDrive();

  const response = await drive.files.create({
    requestBody: {
      name: path.basename(filePath),
      mimeType: 'application/pdf',
    },
    media: {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath),
    },
    fields: 'id, webViewLink',
  });

  return {
    id: response.data.id,
    link: response.data.webViewLink,
  };
}


module.exports = { uploadCV };
