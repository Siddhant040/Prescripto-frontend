import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/checkAuth";

const ProtectedRoutes = ({ children }) => {
    
    
    const { user , isCheckingAuth } = useAuth();
    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    if (!user) {
    return <Navigate to="/login" replace />;
}

    return <Outlet />
};

export default ProtectedRoutes;

