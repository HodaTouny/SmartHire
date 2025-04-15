import React from "react";
import { BrowserRouter as Router, Routes, Route , useParams} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Auth from "./components/Auth/auth";
import Home from './components/Home/home';
import EmailConfigForm from "./components/EmailConfigForm/EmailConfigForm";
import RecruiterFilterForm from "./components/RecruiterFilterForm/RecruiterFilterForm";
import CandidateList from "./components/CandidateResults/Results/results";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function AuthWrapper() {
  const { type } = useParams();
  return <Auth type={type} />;
}
function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/:type" element={<AuthWrapper />} />
        <Route path="/recruiter/email-config" element = {<EmailConfigForm/>}/>
        <Route path="/recruiter/filter-form" element={<RecruiterFilterForm/>}/>
        <Route path="/candidate-results" element = {<CandidateList/>} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
