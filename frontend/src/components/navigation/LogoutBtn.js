import axios from "axios"
import { useHistory } from 'react-router-dom'

const LogoutBtn = () => {
    const history = useHistory()

    const handleLogout = () => {
        axios.get(`${process.env.REACT_APP_API}/auth/logout`, {withCredentials:true})
            .then((res) => {
                if (res.status === 200) {
                    history.push('/login')
                }
                else {
                    console.log("Logout not working")
                }
            })
            .catch((err) => console.log(err))
    }

    return ( 
        <div onClick={handleLogout} className="btn">
            Logout
        </div>
     );
}
 
export default LogoutBtn;