# SmartHire – AI-Powered CV Filtering for Recruiters

## Overview

**SmartHire** is a smart web application that helps recruiters automatically filter and rank CVs. It connects to the recruiter’s email inbox, finds new job applications, extracts the attached CVs, and uses **Gemini AI** to rate candidates based on job requirements. The recruiter only sees the **top 10% of candidates**, saving significant time and effort.

---

## Problem Statement

Recruiters often spend hours manually reviewing a large number of CVs. This process is time-consuming and can result in overlooking highly qualified candidates. SmartHire solves this by:

- Automatically extracting CVs from emails  
- Parsing documents and evaluating them using AI  
- Ranking and returning only the top-matching candidates  

---

## Key Features

- Google Login via secure OAuth 2.0  
- CV extraction from email inbox (filtered by subject & time interval)  
- Support for PDF and Word file formats  
- AI scoring using Gemini API based on job criteria  
- Displays only the top 10% of candidates  
- Google Drive integration to store shortlisted CVs  
- View top-ranked candidates  

---

## Tech Stack

| Layer            | Technology                           |
|------------------|--------------------------------------|
| Frontend         | React.js, Bootstrap                  |
| Backend          | Node.js, Express.js                  |
| Database         | MongoDB                              |
| Authentication   | Google OAuth 2.0 via Passport.js     |
| Cloud Storage    | Google Drive API                     |
| AI Scoring       | Gemini API                           |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/smarthire.git
cd smarthire
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Run the Project

#### Start the Backend

```bash
cd backend
npm run dev
```

#### Start the Frontend

```bash
cd frontend
npm start
```

Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

### 1. Authentication

#### `GET /auth/google`

Initiates Google OAuth 2.0 login for recruiters. Redirects to the Google sign-in page and returns the recruiter’s profile upon success.

---

### 2. Save Email configuration

#### `POST /email/save-config`

**Description:**  
Saves the recruiter’s email configuration for CV extraction.

**Request Body Example:**

```json
{
  "email": "xxxx@gmail.com",
  "type": "IMAP",
  "host": "imap.gmail.com",
  "username": "xxxx@gmail.com",
  "password": "your-app-password"
}
```

**Responses:**
- `200 OK` – Configuration saved successfully  
- `400 Bad Request` – Email already exists  
- `500 Internal Server Error` – General failure  

---
### 3. Email Parsing & CV Filtering

#### `POST /email/start-parsing`

**Description:**  
Starts scanning the inbox based on saved configuration. It fetches matching emails, extracts CVs, parses content, and sends it to Gemini AI for scoring.

**Request Body Example:**

```json
{
  "username": "xxxx@gmail.com",
  "email_subject": "Application for Backend",
  "job_title": "Software Engineer",
  "start_date": "2025-01-01",
  "end_date": "2025-04-16",
  "min_experience": 1,
  "education_level": "Bachelor's Degree",
  "languages": "English, Arabic",
  "required_skills": "JavaScript, Node.js, React"
}
```

**Responses:**
- `200 OK` – Returns a summary of parsed CVs and top candidates  
- `404 Not Found` – Username not found  
- `500 Internal Server Error` – Parsing or AI scoring failed  

---

## Example Flow

1. Recruiter logs in using Google  
2. Configures job filters and criteria  
3. SmartHire scans inbox for CVs matching the subject
4. CVs are parsed and scored using Gemini AI  
5. Top candidates are displayed
