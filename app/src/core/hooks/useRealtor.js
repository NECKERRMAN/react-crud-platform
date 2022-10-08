import { useAuthContext } from "../../components/App/Auth/AuthProvider";
import checkRealtor from "../Utils/checkRealtor";

const useRealtor = () => {
    const { auth } = useAuthContext();
    if (!auth) return null;
    return checkRealtor(auth.user);
};

export default useRealtor;
