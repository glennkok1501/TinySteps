import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@mdi/react';
import { mdiAccount, mdiEmail, mdiLock } from '@mdi/js';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        axios.post(`${process.env.REACT_APP_API}/auth/signup`, { username, email, password }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.auth) {
                    setUsernameErr('');
                    setEmailErr('');
                    setPasswordErr('');
                    history.push('/');
                } else {
                    setIsPending(false);
                    setUsernameErr(res.data.error.username);
                    setEmailErr(res.data.error.email);
                    setPasswordErr(res.data.error.password);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header text-center">
                        <h1 className="brand-title">Join Tiny Steps</h1>
                        <p className="text-muted">Create an account to start your journey</p>
                    </div>

                    {usernameErr && <div className="alert alert-danger" role="alert">{usernameErr}</div>}
                    {emailErr && <div className="alert alert-danger" role="alert">{emailErr}</div>}
                    {passwordErr && <div className="alert alert-danger" role="alert">{passwordErr}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label">Username</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Icon path={mdiAccount} size={0.8} />
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Choose a username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

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

                        <div className="mb-4">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Icon path={mdiLock} size={0.8} />
                                </span>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="••••••••" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    Creating account...
                                </>
                            ) : 'Create Account'}
                        </button>

                        <div className="text-center">
                            <Link to="/login" className="auth-link">
                                Already have an account? Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
