import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminPending] = useAdmin();
    const location = useLocation()
    console.log("User ", user, "Is Admin: ",isAdmin, isAdminPending)

    if (loading || isAdminPending)
        return <progress className='progress w-screen mt-28 mx-32' ></progress>
    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/login" state={location} />
};

export default AdminRoute;