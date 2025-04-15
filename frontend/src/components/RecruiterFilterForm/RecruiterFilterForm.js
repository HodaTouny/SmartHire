import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../CustomAlerts/CustomeAlert";
import "./FilterForm.css";

const apiUrl = process.env.REACT_APP_API_URL;

const RecruiterFilterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    jobTitle: "",
    requiredSkills: "",
    experience: "",
    education: "",
    languages: "",
    emailSubject: "",
    username: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const finalData = {
    username: filters.username,
    email_subject: filters.emailSubject,
    job_title: filters.jobTitle,
    start_date: filters.startDate,
    end_date: filters.endDate,
    min_experience: filters.experience,
    education_level: filters.education,
    languages: filters.languages,
    required_skills: filters.requiredSkills
  };

  let updatedEndDate = filters.endDate;
  if (updatedEndDate) {
    const endDate = new Date(updatedEndDate);
    endDate.setDate(endDate.getDate() + 1);
    updatedEndDate = endDate.toISOString().split('T')[0];
  }

  const dataWithUpdatedEndDate = { ...finalData, end_date: updatedEndDate };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/email/start-parsing`,
        dataWithUpdatedEndDate,
        { withCredentials: true }
      );

      if (response.data.message === "No new CVs found") {
        showToast("No new CVs found in the specified date range.","info");
      } else {
        showToast("CVs parsed and scored successfully!","success");
      }

      navigate("/candidate-results", {
        state: { candidates: response.data.topCvs || [] }
      });

    } catch (error) {
      console.error("Error:", error);
      showToast(
        error?.response?.data?.message || "Something went wrong. Try again."
      ,"error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="filter-form-container">
      <h2 className="filter-title">CV Filtering Criteria</h2>
      <form onSubmit={handleSubmit} className="filter-form">
        <label>
          email-config username:
          <input type="text" name="username" value={filters.username} onChange={handleChange} placeholder="username you add when you config needed email" />
        </label>
        <label>
          Start Date:
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
        </label>
        <label>
          Email Subject:
          <input type="text" name="emailSubject" value={filters.emailSubject} onChange={handleChange} placeholder="e.g., Application For ....." />
        </label>
        <label>
          Job Title:
          <input type="text" name="jobTitle" value={filters.jobTitle} onChange={handleChange} placeholder="e.g., Backend Developer" />
        </label>
        <label>
          Required Skills:
          <input type="text" name="requiredSkills" value={filters.requiredSkills} onChange={handleChange} placeholder="e.g., JavaScript, Python" />
        </label>
        <label>
          Minimum Experience (Years):
          <input type="number" name="experience" value={filters.experience} onChange={handleChange} min="0" placeholder="e.g., 3" />
        </label>
        <label>
          Education Level:
          <select name="education" value={filters.education} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
        </label>
        <label>
          Languages:
          <input type="text" name="languages" value={filters.languages} onChange={handleChange} placeholder="e.g., English, French" />
        </label>
        <div className="btn-div">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Filtering..." : "Start Filtering"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterFilterForm;
