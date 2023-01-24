import Cookies from 'universal-cookie';
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();

    const cookies = new Cookies();
    var storage = cookies.get('STORAGE');

    if (storage) {
        if ('role' in storage) {
            if (allowedRoles?.includes(storage.role)) {
                return <Outlet />;
            }
    
            return <Navigate to="/unauthorized" state={{ from: location }} replace />;
        }
    }
    
    return <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;