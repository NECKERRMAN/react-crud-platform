import { Outlet } from "react-router-dom";
import Header from "./Shared/Generic/Header/Header";
import PageWrapper from "../Design/PageWrapper/PageWrapper";
import useFetch from "../../core/hooks/useFetch";
import Alert from "../Design/Alert/Alert";
import LoadingIndicator from "./Shared/Generic/LoadingIndicator/LoadingIndicator";

const AppLayout = () => {
    const { isLoading, error, data: user } = useFetch("/account");

    if (error) return <Alert>{error}</Alert>;
    if (isLoading) return <LoadingIndicator />;

    return (
        <>
            <Header />
            <PageWrapper>
                <Outlet context={{ user }} />
            </PageWrapper>
        </>
    );
};

export default AppLayout;
