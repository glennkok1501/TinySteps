import { useHistory } from "react-router";
import { mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';
import axios from "axios"

const LogoutBtn = () => {
    const history = useHistory();

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
        <button 
            onClick={handleLogout}
            className="nav-link w-100 text-start border-0 bg-transparent"
        >
            <Icon path={mdiLogout} size={1} className="nav-icon" />
            Logout
        </button>
    );
};

export default LogoutBtn;