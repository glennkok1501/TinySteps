import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { mdiEmailCheck, mdiAlertCircle, mdiCheckCircle } from '@mdi/js';
import Icon from '@mdi/react';

const VerifyPage = () => {
    const history = useHistory();
    const { verification_string } = useParams();
    const [error, setError] = useState('');
    const [pending, setPending] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}/auth/verify-user`, 
            { verification_string: verification_string })
            .then((res) => {
                setPending(false);
                if (res.data.auth) {
                    setSuccess(true);
                    setTimeout(() => {
                        history.push('/');
                    }, 3000); // Redirect after 3 seconds
                } else {
                    setError("Unable to verify your email. The verification link may have expired.");
                }
            })
            .catch((err) => {
                console.log(err);
                setPending(false);
                setError("An error occurred during verification. Please try again later.");
            });
    }, [verification_string, history]);

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    {pending ? (
                        <div className="text-center">
                            <div className="verification-icon mb-4 pending">
                                <Icon path={mdiEmailCheck} size={2} />
                            </div>
                            <h2 className="brand-title mb-4">Verifying Your Email</h2>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="text-muted mt-3">Please wait while we verify your email address...</p>
                        </div>
                    ) : success ? (
                        <div className="text-center">
                            <div className="verification-icon mb-4 success">
                                <Icon path={mdiCheckCircle} size={2} />
                            </div>
                            <h2 className="brand-title mb-3">Email Verified!</h2>
                            <p className="text-muted">Your email has been successfully verified.</p>
                            <p className="text-muted">Redirecting you to the homepage...</p>
                            <div className="progress mt-4" style={{ height: "4px" }}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated" 
                                     style={{ width: "100%" }} />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="verification-icon mb-4 error">
                                <Icon path={mdiAlertCircle} size={2} />
                            </div>
                            <h2 className="brand-title mb-3">Verification Failed</h2>
                            <p className="text-danger">{error}</p>
                            <button 
                                className="btn btn-primary mt-3"
                                onClick={() => history.push('/login')}
                            >
                                Return to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyPage;