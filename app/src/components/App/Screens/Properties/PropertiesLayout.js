import { Outlet } from "react-router-dom";
import Alert from "../../../Design/Alert/Alert";
import PageWrapper from "../../../Design/PageWrapper/PageWrapper";
import VideoHeader from "../../../Design/VideoHeader/VideoHeader";
import { useAuthContext } from "../../Auth/AuthProvider";
import Header from "../../Shared/Generic/Header/Header";
import { useTranslation } from "react-i18next";

const PropertiesLayout = () => {
    const { auth } = useAuthContext();
    const { t } = useTranslation();

    if (auth) {
        return (
            <>
                <Header />
                <PageWrapper>
                    <Outlet />
                </PageWrapper>
            </>
        );
    }

    return (
        <>
            <Header />
            <Alert type="info">
                <p>{t("navigation.loggedout")}</p>
            </Alert>
            <VideoHeader />
            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </>
    );
};

export default PropertiesLayout;
