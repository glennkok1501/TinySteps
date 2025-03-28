import { useState } from 'react';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { mdiLock, mdiLockCheck } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';

const ResetPasswordPage = () => {
    const { reset_id } = useParams();
    const history = useHistory();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsPending(true);

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/auth/reset-password`,
                { 
                    reset_id,
                    new_password: newPassword 
                },
                { withCredentials: true }
            );

            if (res.data.result) {
                setSuccess(true);
                setTimeout(() => {
                    history.push('/');
                }, 3000);
            }
            else {
                setError(res.data.error)
            }
            
        } catch (err) {
            setError('Failed to reset password. The link may have expired.');
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
                                <h1 className="brand-title">Reset Password</h1>
                                <p className="text-muted">
                                    Please enter your new password below
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label">New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Icon path={mdiLock} size={0.8} />
                                        </span>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Enter new password" 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Confirm New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Icon path={mdiLockCheck} size={0.8} />
                                        </span>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Confirm new password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100" 
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Resetting Password...
                                        </>
                                    ) : 'Reset Password'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="verification-icon mb-4 success">
                                <Icon path={mdiLockCheck} size={2} />
                            </div>
                            <h2 className="brand-title mb-3">Password Reset Successful!</h2>
                            <p className="text-muted mb-4">
                                Your password has been successfully reset.
                                <br />
                                Redirecting...
                            </p>
                            <div className="progress mt-4" style={{ height: "4px" }}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated" 
                                     style={{ width: "100%" }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;