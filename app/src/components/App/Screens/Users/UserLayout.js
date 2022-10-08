import { Outlet } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import LoadingIndicator from "../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const UserLayout = () => {
    const { isLoading, error, invalidate, data: user } = useFetch(`/account`);

    const handleUpdate = () => {
        invalidate();
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <Outlet context={{ user, onUserUpdate: handleUpdate }} />
        </>
    );
};

export default UserLayout;
