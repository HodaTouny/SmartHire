const Imap = require("imap-simple");
const fs = require("fs");
const path = require("path");
const { saveCvInfo, checkAttachmentExists } = require("../dao/Cvdao");

const FILE_DIR = path.join(__dirname, "files");
if (!fs.existsSync(FILE_DIR)) {
  fs.mkdirSync(FILE_DIR); 
}

async function checkEmails(startDate = null, endDate = null, subjectFilter = "", config) {
  const imapConfig = {
    imap: {
      user: config.username,
      password: config.password,
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 15000,
      keepalive: { interval: 20000, idleInterval: 60000, forceNoop: true },
    },
  };

  let connection;
  try {
    connection = await Imap.connect(imapConfig);
    await connection.openBox("INBOX");

    const date = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date();

    const searchCriteria = [
      ["SINCE", date.toISOString().slice(0, 10)],
      ["BEFORE", end.toISOString().slice(0, 10)],
      ["SUBJECT", subjectFilter]
    ];
    const fetchOptions = { bodies: ["HEADER"], struct: true };
    const messages = await connection.search(searchCriteria, fetchOptions);
    if (messages.length === 0) {
      connection.end();
      return { message: "no new emails" };
    }

    let savedEmails = [];

    for (const message of messages) {
      const header = message.parts.find((part) => part.which === "HEADER").body;
      const subject = header.subject ? header.subject[0] : "No Subject";
      const attachments = Imap.getParts(message.attributes.struct)
        .filter((part) => part.disposition && part.disposition.type.toLowerCase() === "attachment") 
        .filter((part) => {
          const filename = part.params?.name?.toLowerCase();
          return filename && (filename.endsWith('.pdf') || filename.endsWith('.doc') || filename.endsWith('.docx')); 
        })

      if (attachments.length === 0) continue;
      for (const attachment of attachments) { 
        const filename = attachment.params.name.toLowerCase();
        const existingFile = await checkAttachmentExists(filename);

        if (existingFile) continue;
        const filePath = path.join(FILE_DIR, filename);
        
        try {
          const attachmentPart = await connection.getPartData(message, attachment);
          fs.writeFileSync(filePath, attachmentPart);
          await saveCvInfo({
            fileId: filename,
            driveLink: filePath,
            score: 0,
            provider: config.email,
          });
          savedEmails.push({filename });
        } catch (fileError) {
          console.error(`Error saving attachment: ${fileError.message}`);
        }
      }
    }

    connection.end();
    return { status: "success", savedEmails };
  } catch (error) {
    console.error(`Error fetching emails for ${config.email}:`, error.message);

    if (error.code === "AUTHENTICATIONFAILED") {
      return { message: "authentication failed" };
    }

    if (error.code === "ECONNRESET") {
      console.log("Connection reset detected. Retrying...");
      await new Promise(resolve => setTimeout(resolve, 15000));
      return checkEmails(startDate, endDate, subjectFilter, config);
    }

    return { message: "unknown error", error: error.message };
  }
}

module.exports = { checkEmails };
