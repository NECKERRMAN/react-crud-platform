import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { RealtorRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Title from "../../../../Design/Title/Title";
import PropertyForm from "../../../Shared/Properties/PropertyForm";

const New = () => {
    const { user } = useOutletContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/realtor/new-property`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(RealtorRoutes.Dashboard);
            },
        });
    };

    return (
        <>
            <Title>{t("properties.create.title")}</Title>
            {error && <Alert color="danger">{error}</Alert>}
            <PropertyForm
                officeId={user ? user.office.id : "0"}
                label="save"
                isDisabled={isLoading}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default New;
