import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

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
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-secondary">
            <div className="card shadow p-4" style={{ width: '30rem' }}>
                <h1 className="text-center mb-3">Create an Account</h1>
                {usernameErr && <div className="alert alert-danger" role="alert">{usernameErr}</div>}
                {emailErr && <div className="alert alert-danger" role="alert">{emailErr}</div>}
                {passwordErr && <div className="alert alert-danger" role="alert">{passwordErr}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="Choose a username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="me@example.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isPending}>
                        {isPending ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <Link className='text-muted text-decoration-none' to="/login">Already have an account? Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
