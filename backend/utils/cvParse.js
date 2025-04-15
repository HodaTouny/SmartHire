const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

async function parsePDF(localCvPath) {
  const buffer = fs.readFileSync(localCvPath);
  const data = await pdfParse(buffer);
  return data.text;
}

async function parseWord(localCvPath) {
  const buffer = fs.readFileSync(localCvPath);
  const result = await mammoth.extractRawText({ buffer: buffer });
  return result.value;
}

async function parseCV(localCvPath) {
  const extname = path.extname(localCvPath).toLowerCase();

  let text = '';

  if (extname === '.pdf') {
    text = await parsePDF(localCvPath);
  } else if (extname === '.docx') {
    text = await parseWord(localCvPath);
  } else {
    throw new Error('Unsupported file type');
  }

  return text;
}

module.exports = { parseCV };
