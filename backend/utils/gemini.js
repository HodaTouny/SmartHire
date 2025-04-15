require('dotenv').config();
const fetch = require("node-fetch");

async function ScoreCV(jobRequirements, cvText) {

  
  const {job_title,min_experience,education_level,languages,required_skills} = jobRequirements;

  const prompt = `
    You are a professional recruitment assistant.

    Your task is to evaluate and score a candidate's CV based on the job requirements provided. Carefully read the job requirements and the full CV text, then assign a score out of 100. Provide a clear, section-wise breakdown of the score and a final overall score.

    --- Job Requirements ---
    Job Title: ${job_title}
    Minimum Experience: ${min_experience}
    Education Level: ${education_level}
    Languages Required: ${languages}
    Required Skills: ${required_skills}

    --- Candidate CV ---
    ${cvText}

    --- Scoring Instructions ---
    Evaluate the candidate based on the following criteria:

    1. Education (20 points)
    2. Work Experience (30 points)
    3. Skills Match (25 points)
    4. Projects and Achievements (15 points)
    5. Language Proficiency and Soft Skills (10 points)

    Clearly explain the score given in each category and justify any deductions. Then, provide a final score out of 100 at the end.

    Now perform the evaluation.
`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const scoreMatch = text.match(/final score (is|:)?\s*(\d{1,3})/i) || text.match(/(\d{1,3})\/100/);
  const score = scoreMatch ? parseFloat(scoreMatch[2] || scoreMatch[1]) : null;

  return { score };
}

module.exports = { ScoreCV };
