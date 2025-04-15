const EmailConfig = require("../models/emailConfig");

const saveEmailConfig = async (email, type = "IMAP", host="imap.gmail.com", username, password) => {
    try {
        const newEmailConfig = await EmailConfig.create({email,type,host,username,password,});

        return newEmailConfig;
    } catch (error) {   
        console.error("Error saving email configuration:", error);
        throw error;
    }
}

const checkEmailExists = async (email) => {
    try {
        const emailConfig = await EmailConfig.findOne({ email: email });
        return emailConfig !== null;
    } catch (error) {
        console.error("Error checking email existence:", error);
        throw error;
    }
}

const getEmailConfig = async (email) => {
    try {
        const emailConfig = await EmailConfig.findOne({ email });
        return emailConfig;
    } catch (error) {
        console.error("Error fetching email configuration:", error);
        throw error;
    }
}

module.exports = { saveEmailConfig, getEmailConfig,checkEmailExists };
