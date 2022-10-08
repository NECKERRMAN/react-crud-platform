import { Link } from "react-router-dom";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHatCowboy,
    faHouse,
    faHouseChimney,
    faPlus,
    faSearch,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { AdminRoutes, route } from "../../../../../core/routing";
import useTitle from "../../../../../core/hooks/useTitle";

const AdminDashboard = () => {
    const { t } = useTranslation();
    useTitle(t("admin.dashboard.title"));
    return (
        <>
            <Title>Dashboard</Title>
            <Container className="grid grid-cols-4 gap-4 m-auto grid-flow-row-dense">
                <Link
                    className="btn btn--dashboard col-span-2 h-full"
                    to={route(AdminRoutes.NewProperty)}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p>{t("admin.dashboard.new-property")}</p>
                </Link>
                <Link
                    className="btn btn--dashboard col-span-2 h-full"
                    to={route(AdminRoutes.AllProperties)}>
                    <FontAwesomeIcon icon={faHouse} />
                    <p>{t("admin.dashboard.properties")}</p>
                </Link>
                <Link
                    className="btn btn--dashboard col-span-2 h-full"
                    to={route(AdminRoutes.AllCategories)}>
                    <FontAwesomeIcon icon={faSearch} />
                    <p>{t("admin.dashboard.categories")}</p>
                </Link>
                <Link
                    className="btn btn--dashboard col-span-2 h-full"
                    to={route(AdminRoutes.Offices)}>
                    <FontAwesomeIcon icon={faHouseChimney} />
                    <p>{t("admin.dashboard.offices")}</p>
                </Link>
                <Link
                    className="btn btn--dashboard col-span-2 h-full"
                    to={route(AdminRoutes.Realtors)}>
                    <FontAwesomeIcon icon={faHatCowboy} />
                    <p>{t("admin.dashboard.realtors")}</p>
                </Link>
                <Link
                    className="btn btn--dashboard col-span-2 h-full"
                    to={route(AdminRoutes.Users)}>
                    <FontAwesomeIcon icon={faUsers} />
                    <p>{t("admin.dashboard.users")}</p>
                </Link>
            </Container>
        </>
    );
};

export default AdminDashboard;
