import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const SignupPage = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [usernameErr, setUsernameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const [isPending, setIsPending] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true)

        axios.post(`${process.env.REACT_APP_API}/auth/signup`, {username, email, password}, {withCredentials:true})
            .then((res) => {
                console.log(res.data)
                if (res.data.auth){
                    setUsernameErr('')
                    setEmailErr('')
                    setPasswordErr('')
                    history.push('/')
                }   else {
                    setIsPending(false)

                    setUsernameErr(res.data.error.username)
                    setEmailErr(res.data.error.email)
                    setPasswordErr(res.data.error.password)
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
            <div>
                <label className='form-label'>Username</label>
                <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                {usernameErr && <div className="alert alert-danger" role="alert">{usernameErr}</div>}
            </div>
            <div>
                <label className='form-label'>Email</label>
                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                {emailErr && <div className="alert alert-danger" role="alert">{emailErr}</div>}
            </div>
            <div>
                <label className='form-label'>Password</label>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                {passwordErr && <div className="alert alert-danger" role="alert">{passwordErr}</div>}
            </div>
                
                {(!isPending) ? <button>Sign Up</button> : <button disabled>Sign Up</button>}

                
            </form>
        </div>
        
    )
}

export default SignupPage;