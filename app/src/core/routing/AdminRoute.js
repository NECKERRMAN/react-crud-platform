import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../components/App/Auth/AuthProvider";
import checkAdmin from "../Utils/checkAdmin";
import { PropertiesRoutes } from ".";

const AdminRoute = ({ children }) => {
    const { auth } = useAuthContext();

    if (!auth) {
        return <Navigate to={"/auth/login"} />;
    }

    const routeSecured = checkAdmin(auth.user);

    if (routeSecured) {
        return children;
    } else {
        return <Navigate to={PropertiesRoutes.Index} />;
    }
};

export default AdminRoute;
