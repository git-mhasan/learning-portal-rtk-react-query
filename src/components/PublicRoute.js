import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthUser } from "../features/auth/authSelector";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
    const isLoggedIn = useAuth();
    const user = useSelector(selectAuthUser);

    return !isLoggedIn ? children : user?.role === "admin" ?
        <Navigate to="/admin/dashboard" /> : <Navigate to="/lesson/1" />;
}
