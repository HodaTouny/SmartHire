import React from "react";
import "../results.css";

function CandidateCard ({ candidate }){
  return (
    <div className="candidate-card">
      <p><strong>Relevance Score:</strong> {candidate.score} / 100</p>
      <a href={candidate.link} target="_blank" rel="noopener noreferrer" className="email-config-btn">View CV</a>
    </div>
  );
};



export default CandidateCard