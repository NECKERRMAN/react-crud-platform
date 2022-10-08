import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { AdminRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import BackButton from "../../../../Design/Button/BackButton";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import PropertyForm from "../../../Shared/Properties/PropertyForm";

const NewProperty = () => {
    const { t } = useTranslation();

    useTitle(t("properties.create.title"));

    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/admin/new-property`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(AdminRoutes.AllProperties);
            },
        });
    };

    return (
        <>
            <BackButton href={route(AdminRoutes.Dashboard)} />
            <Title>{t("admin.properties.add")}</Title>
            <Container className="mb-4">
                {error && <Alert color="danger">{error}</Alert>}
                <PropertyForm
                    label={"save"}
                    isDisabled={isLoading}
                    onSubmit={handleSubmit}
                />
            </Container>
        </>
    );
};

export default NewProperty;
