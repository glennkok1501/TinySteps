import { useEffect, useState } from "react";
import axios from "axios";

const RequireAuth = () => {
    console.log(`${process.env.REACT_APP_API}/auth/verify`)

    const endpoint = `${process.env.REACT_APP_API}/auth/verify`

    const [auth, setAuth] = useState(null)
    const [isTokenValid, setIsTokenValid] = useState(false)

    useEffect(() => {
        // send jwt token to API for verification
        axios.get(endpoint, { withCredentials: true })
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
    }, [endpoint])

    return {auth, isTokenValid}
}

export default RequireAuth