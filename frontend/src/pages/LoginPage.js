import {useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

const SignupPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true)

        axios.post(`${process.env.REACT_APP_API}/auth/login`, {username, password}, {withCredentials:true})
            .then((res) => {
                console.log(res.data)
                if (res.data.auth){
                    history.push('/')
                }   else {
                    setIsPending(false)
                    setError(res.data.error)
                    //TODO show error
                }
            })
            .catch((err) => console.log(err))
        }

    return (
        <div className='container'>
            <div className='content card'>
                <h1 className='center'>Login to Your Account</h1>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='form-label'>Username</label>
                        <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label className='form-label'>Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='center'>
                        <button className='btn btn-outline-light' disabled={isPending}>Login</button>
                    </div>
                </form>
                <Link to="/signup" className='center'>Sign Up</Link>
            </div>
        </div>
    )
}

export default SignupPage;