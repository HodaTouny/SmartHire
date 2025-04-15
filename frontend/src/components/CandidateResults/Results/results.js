import "../results.css";
import { useLocation } from "react-router-dom";
import CandidateCard from "../ResultItem/resultItem";


function CandidateList() {
  const location = useLocation();
  const candidates = location.state?.candidates || [];
  return (
    <div className="candidate-list">
      {candidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        candidates.map((candidate, index) => (
          <CandidateCard key={index} candidate={candidate} />
        ))
      )}
    </div>
  );
}


export default CandidateList;