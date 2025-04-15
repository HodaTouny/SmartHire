import { Link } from 'react-router-dom';
import {useContext} from "react";
import './hero.css';
import HeroImage from './hero.png';
import {UserContext} from "../../context/userContext";
function Hero() {
    const { user } = useContext(UserContext);
    return (
        <div className="hero container d-flex flex-column flex-md-row align-items-center text-center text-md-start">
            <div className="hero-text col-md-6 col-12">
                <h2>Find the Right Candidates in Seconds</h2>
                <p>SmartHire analyzes and ranks CVs instantly, helping you identify top candidates without manual screening.</p>
                {user ? (
                    <Link to="/recruiter/filter-form" className="btn hero-btn">
                        Start Filtering CVs Now
                    </Link>
                    ) : (
                    <Link to="/auth/signup" className="btn hero-btn">
                        Start Filtering CVs Now
                    </Link>
                )}
            </div>
            <div className="hero-image col-md-6 col-12 d-flex justify-content-center">
                <img src={HeroImage} alt="Hero image" className="img-fluid"/>
            </div>
        </div>
    );
}

export default Hero;