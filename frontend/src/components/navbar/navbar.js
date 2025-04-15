import React, { useContext } from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../context/userContext";
import "./navbar.css";

function Navbar() {
    const { user } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">SmartHire</Link>
                <div className="d-flex">
                    {user ? (
                        <>
                         <div>
                            <Link to="/recruiter/email-config" className="link">Add Config Email</Link>
                            <Link to="/recruiter/filter-form" className="link">Filter CVs</Link>
                        </div>
                        <a href={`${process.env.REACT_APP_API_URL}/auth/logout`} className="btn logout-btn">Logout</a>
                        </>
                    ) : (
                        <>
                        <Link to="/auth/signin" className="btn login-btn">Login</Link>
                        <Link to="/auth/signup" className="btn signup-btn">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}   

export default Navbar;
