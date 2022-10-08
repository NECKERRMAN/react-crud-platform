import { useNavigate, useOutletContext } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import Title from "../../../../Design/Title/Title";
import { useTranslation } from "react-i18next";
import PropertyForm from "../../../Shared/Properties/PropertyForm";
import useMutation from "../../../../../core/hooks/useMutation";
import { PropertiesRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";

const Edit = () => {
    const { t } = useTranslation();
    const { property } = useOutletContext();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(
            `${process.env.REACT_APP_API_URL}/realtor/property/${property.id}`,
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
            <Title>
                {property.adress} | {property.city.zipcode} -{" "}
                {property.city.name}
            </Title>
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
