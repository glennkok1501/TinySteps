import { Redirect, Route } from 'react-router'
import RequireAuth from './RequireAuth'

const ProtectedRoute = ({component: Component, ...options}) => {

    const {auth, isTokenValid} = RequireAuth()

    if (!isTokenValid) return (
        <div className="text-center"><div className="spinner-grow" role="status"></div></div>
    )

   return (<Route {...options}
    render={(props) => {return auth ? <Component {...props} user={auth} /> : <Redirect to="/login"/>}} />
   )

    
}

export default ProtectedRoute