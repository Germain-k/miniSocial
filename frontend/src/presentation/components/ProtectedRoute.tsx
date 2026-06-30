import { Navigate } from "react-router-dom";
import { useAuth } from "../../application/hooks/useAuth";
import { type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

// Si l'utilisateur n'est pas connecté, redirige vers /login
const ProtectedRoute = ({ children} : Props) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate  to="/login" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;