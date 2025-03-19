import { Redirect, Route } from 'react-router'
import RequireAuth from './RequireAuth'
import { setUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

const ProtectedRoute = ({component: Component, ...options}) => {

    const {auth, isTokenValid} = RequireAuth()
    const dispatch = useDispatch();

    if (!isTokenValid) {
        dispatch(setUser(auth))
    }

    if (!isTokenValid) return (
        <div className="position-absolute top-50 start-50">
            <div className="spinner-border" role="status" />
        </div>
    )

   return (<Route {...options}
    render={(props) => {return auth ? <Component {...props} user={auth} /> : <Redirect to="/login"/>}} />
   )

    
}

export default ProtectedRoute