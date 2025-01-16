import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading)
        return <progress className='progress w-screen mt-28 mx-32' ></progress>
    if (user) {
        return children
    }
    return <Navigate to="/login" state={location} />
};

export default PrivateRoute;