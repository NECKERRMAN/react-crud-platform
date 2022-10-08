import { useAuthContext } from "../../components/App/Auth/AuthProvider";
import checkAdmin from "../Utils/checkAdmin";

const useAdmin = () => {
    const { auth } = useAuthContext();
    if (!auth) return null;
    return checkAdmin(auth.user);
};

export default useAdmin;
