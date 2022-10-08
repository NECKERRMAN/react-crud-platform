import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert/Alert";
import OfficeDetails from "./OfficeDetails";
import OfficeMessages from "./OfficeMessages";

const RealtorOffice = () => {
    const { t } = useTranslation();
    useTitle(t("offices.realtor"));

    const {
        isLoading,
        error,
        data: office,
        invalidate,
    } = useFetch("/realtor/office");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    const handleUpdate = () => {
        invalidate();
    };

    return (
        <>
            <OfficeMessages />
            <OfficeDetails office={office} onUpdate={handleUpdate} />
        </>
    );
};

export default RealtorOffice;
