import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { isLoggedIn } = useContext(UserContext);
    return isLoggedIn ? children : <Navigate to="/" replace/>
}

export default ProtectedRoute;