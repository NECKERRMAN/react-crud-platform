import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import Alert from "../../../../Design/Alert/Alert";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import UsersOverview from "./UsersOverview/UsersOverview";
import BackButton from "../../../../Design/Button/BackButton";
import { AdminRoutes, route } from "../../../../../core/routing";

const AllUsers = () => {
    const { t } = useTranslation();
    useTitle(t("admin.users.all"));

    const { isLoading, data: users, error } = useFetch("/admin/users/");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <Container>
                <BackButton href={route(AdminRoutes.Dashboard)} />
                <Title type="small">{t("users.title")}</Title>
                <UsersOverview users={users} />
            </Container>
        </>
    );
};

export default AllUsers;
