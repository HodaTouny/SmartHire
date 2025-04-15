import './why.css';

function Why() {
    return (
        <div className="why-section container text-center">
            <h2>Why SmartHire?</h2>
            <div className="features row justify-content-center text-center">
                <div className="col-md-4 col-sm-12 mb-3">
                    <div className="feature-card">
                        <h4>AI-Powered CV Filtering</h4>
                        <p>Instantly analyze and rank resumes, so you focus only on top talent.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 mb-3">
                    <div className="feature-card">
                        <h4>Save Time & Effort</h4>
                        <p>Reduce manual screening, letting you hire faster and smarter.</p>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 mb-3">
                    <div className="feature-card">
                        <h4>Better Hiring Decisions</h4>
                        <p>AI helps you identify the most qualified candidates effortlessly</p>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default Why;