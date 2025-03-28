import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const VerifyPage = () => {
    const history = useHistory();

    const {verification_string} = useParams()
    const [error, setError] = useState('')
    const [pending, setPending] = useState(true)

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}/auth/verify-user`, {verification_string: verification_string})
            .then((res) => {
                console.log(res)
                setPending(false)
                if (res.data.auth) {
                    history.push('/');
                }
                else {
                    setError("Unable to verify")
                }
            })
            .catch((err) => {
                console.log(err)
                setError("An error occured")
            })
    }, [])

    return ( 
        <div>
           {pending ? "Verifiying..." : error}
        </div>
     );
}
 
export default VerifyPage;