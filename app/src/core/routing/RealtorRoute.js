import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../components/App/Auth/AuthProvider";
import { PropertiesRoutes } from ".";
import checkRealtor from "../Utils/checkRealtor";

const RealtorRoute = ({ children }) => {
    const { auth } = useAuthContext();

    if (!auth) {
        return <Navigate to={"/auth/login"} />;
    }

    const routeSecured = checkRealtor(auth.user);

    if (routeSecured) {
        return children;
    } else {
        return <Navigate to={PropertiesRoutes.Index} />;
    }
};

export default RealtorRoute;
