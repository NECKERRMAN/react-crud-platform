import { Navigate, Outlet, useLocation } from "react-router-dom";
import Container from "../../Design/Container/Container";
import Header from "../Shared/Generic/Header/Header";
import { useAuthContext } from "./AuthProvider";

const OnboardingLayout = () => {
    const { auth } = useAuthContext();
    const location = useLocation();

    if (!auth) {
        return (
            <>
                <Header />
                <Container type="full">
                    <Outlet />
                </Container>
            </>
        );
    }

    // check if a previous path was available
    const from = location.state?.from?.pathname || "/";

    return <Navigate to={from} state={{ replace: true }} />;
};

export default OnboardingLayout;
