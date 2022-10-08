import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../../core/hooks/useMutation";
import useTitle from "../../../../../../core/hooks/useTitle";
import { PropertiesRoutes, route } from "../../../../../../core/routing";
import Alert from "../../../../../Design/Alert/Alert";
import PropertyForm from "../../../../Shared/Properties/PropertyForm";

const Edit = ({ property, onEdit }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(
            `${process.env.REACT_APP_API_URL}/admin/property/${property.id}`,
            {
                method: "PATCH",
                data,
                multipart: true,
                onSucces: () => {
                    navigate(
                        route(PropertiesRoutes.Detail, { id: property.id })
                    );
                },
            }
        );
    };

    useTitle(property.adress || t("properties.detail.title"));

    return (
        <>
            {error ? <Alert>{error}</Alert> : ""}
            <PropertyForm
                initialData={property}
                onSubmit={handleSubmit}
                isDisabled={isLoading}
                label={"Update"}
            />
        </>
    );
};

export default Edit;
