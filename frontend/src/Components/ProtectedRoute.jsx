import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, setIsLoggedIn }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />; // Redirect to login if not authenticated
    }

    if (!allowedRoles.includes(userRole)) {
    localStorage.removeItem("token"); // Only remove the token if unauthorized
    localStorage.removeItem("role");
    setIsLoggedIn(false);

        return <Navigate to="/" replace />; // Redirect if unauthorized
    }
    return <Outlet />; // Render child routes if authorized
};

export default ProtectedRoute;
