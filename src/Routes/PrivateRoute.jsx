import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading)
        return <progress className='progress w-screen mt-28 mx-32' ></progress>
    if (user) {
        return children
    }
    return <Navigate to="/login" state={location} />
};

export default PrivateRoute;