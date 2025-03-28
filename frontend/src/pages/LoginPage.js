import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@mdi/react';
import { mdiEmail, mdiLock } from '@mdi/js';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        axios.post(`${process.env.REACT_APP_API}/auth/login`, { email, password }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.auth) {
                    history.push('/');
                } else {
                    setIsPending(false);
                    setError(res.data.error);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header text-center">
                        <h1 className="brand-title">Tiny Steps</h1>
                        <p className="text-muted">Welcome back! Let's find the perfect preschool.</p>
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
                                    Logging in...
                                </>
                            ) : 'Log in'}
                        </button>

                        <div className="text-center">
                            <div>
                                <Link to="/signup" className="auth-link">
                                    Don't have an account? Sign up
                                </Link>
                            
                            </div>
                            <div className="mt-3">
                            <Link to="/forgotpassword" className="auth-link">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;