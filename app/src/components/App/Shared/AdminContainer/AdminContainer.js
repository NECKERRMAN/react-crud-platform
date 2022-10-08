import useAdmin from "../../../../core/hooks/useAdmin";

const AdminContainer = ({ children }) => {
    const admin = useAdmin();

    if (!admin) {
        return null;
    }

    return <>{children}</>;
};

export default AdminContainer;
