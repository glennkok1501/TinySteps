import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

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
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-secondary">
            <div className="card shadow p-4" style={{ width: '30rem' }}>
                <h1 className="text-center mb-3">
                    Let's take <span className="text-primary">Tiny Steps</span> together
                </h1>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="me@example.com" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="••••••••" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100" 
                        disabled={isPending}
                    >
                        Log in
                    </button>
                    <div className='text-center mt-3'>
                        <Link to="/signup" className='text-muted text-decoration-none'>
                            Join us now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;