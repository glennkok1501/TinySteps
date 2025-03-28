import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mdiEmail, mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsPending(true);

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/auth/forgot-password`,
                { email }
            );

            if (res.data.result) {
                setSuccess(true);
            }
            else{
                setError('Failed to send reset email. Please try again.');
            }
        } catch (err) {
            setError('Failed to send reset email. Please try again.');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    {!success ? (
                        <>
                            <div className="auth-header text-center">
                                <h1 className="brand-title">Forgot Your Password?</h1>
                                <p className="text-muted">
                                    Enter your email address and we'll send you instructions to reset your password.
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Icon path={mdiEmail} size={0.8} />
                                        </span>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            placeholder="you@example.com" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 mb-3" 
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Sending...
                                        </>
                                    ) : 'Reset Password'}
                                </button>

                                <div className="text-center">
                                    <Link to="/login" className="auth-link">
                                        <Icon path={mdiArrowLeft} size={0.8} className="me-1" />
                                        Back to Login
                                    </Link>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="verification-icon mb-4 success">
                                <Icon path={mdiEmail} size={2} />
                            </div>
                            <h2 className="brand-title mb-3">Check Your Email</h2>
                            <p className="text-muted mb-4">
                                We've sent password reset instructions to:
                                <br />
                                <strong>{email}</strong>
                            </p>
                            <Link to="/login" className="btn btn-primary">
                                Return to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;