import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useTitle from "../../../../../../core/hooks/useTitle";
import { EditComponent } from "./EditComponent";
import Title from "../../../../../Design/Title/Title";
import useFetch from "../../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../../Design/Alert/Alert";
import BackButton from "../../../../../Design/Button/BackButton";
import { AdminRoutes, route } from "../../../../../../core/routing";

const EditUser = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    useTitle(t("properties.detail.title"));

    const {
        isLoading,
        data: user,
        error,
        invalidate,
    } = useFetch(`/admin/user/${id}`);

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    const handleSubmit = () => {
        invalidate();
    };

    return (
        <>
            <BackButton href={route(AdminRoutes.Dashboard)} />
            <Title type="medium">{t("admin.users.edit")}</Title>
            <EditComponent id={id} user={user} onSubmit={handleSubmit} />
        </>
    );
};

export default EditUser;
