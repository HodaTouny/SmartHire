const fs = require('fs');
const { google } = require('googleapis');

const TOKEN_PATH = 'token.json';

async function connectGoogleDrive() {
  const client_id = process.env.GOOGLE_DRIVE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
  const redirect_uris = JSON.parse(process.env.GOOGLE_DRIVE_REDIRECT_URIS); 

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    try {
      await drive.files.list({ pageSize: 1 });
      console.log("Google Drive connected successfully!");
    } catch (err) {
      console.error("Google Drive connection failed:", err.message);
      throw err;
    }

    return drive;
  } else {
    throw new Error('Token not found. Please authorize first.');
  }
}

module.exports = { connectGoogleDrive };
