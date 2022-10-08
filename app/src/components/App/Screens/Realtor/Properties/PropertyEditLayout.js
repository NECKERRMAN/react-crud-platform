import { Outlet, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const PropertyEditLayout = () => {
    const { id } = useParams();

    const {
        isLoading,
        error,
        invalidate,
        data: property,
    } = useFetch(`/realtor/detail/${id}`);

    const handleUpdate = () => invalidate();

    if (error) return <Alert>{error}</Alert>;
    if (isLoading) return <LoadingIndicator />;

    return <Outlet context={{ property, onClientUpdate: handleUpdate }} />;
};

export default PropertyEditLayout;
