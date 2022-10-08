import Title from "../../../../Design/Title/Title";
import { useTranslation } from "react-i18next";
import DashboardProperties from "./DashboardProperties";
import Button from "../../../../Design/Button/Button";
import { Link } from "react-router-dom";
import { RealtorRoutes, route } from "../../../../../core/routing";
import NewRealtor from "./NewRealtor";
import useTitle from "../../../../../core/hooks/useTitle";

const Dashboard = () => {
    const { t } = useTranslation();
    useTitle(t("realtors.dashboard"));
    return (
        <>
            <Title>{t("navigation.dashboard")}</Title>
            <Title type="medium">{t("properties.title")}</Title>
            <DashboardProperties />
            <Link to={route(RealtorRoutes.New)}>
                <Button>{t("buttons.add")} </Button>
            </Link>
            <hr className="my-4" />
            <Title type="medium">{t("realtors.create.name")}</Title>
            <NewRealtor />
        </>
    );
};

export default Dashboard;
