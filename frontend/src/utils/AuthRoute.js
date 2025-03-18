import axios from 'axios';
import { Redirect, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';

const AuthRoute = ({component: Component, ...options}) => {

    const [auth, setAuth] = useState(null)
    const [isTokenValid, setIsTokenValid] = useState(false)

    useEffect(() => {
        // send jwt token to API for verification
        axios.get(`${process.env.REACT_APP_API}/auth/verify`, { withCredentials: true })
        .then((res) => {
            if (res.data) {
                setAuth(res.data)
            }
        })    
        .then (() => {setIsTokenValid(true)})
        .catch((err) => {
            console.log(err)
            setAuth(null)
            setIsTokenValid(false)

        })
    },[])

    if (!isTokenValid) return (
        <div className="text-center"><div className="spinner-grow" role="status"></div></div>
    )

   return (<Route {...options}
    render={(props) => {return !auth ? <Component {...props} user={auth} /> : <Redirect to="/"/>}} />
   )
}

export default AuthRoute