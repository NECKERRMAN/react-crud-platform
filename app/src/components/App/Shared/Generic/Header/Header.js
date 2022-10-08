import { useAuthContext } from "../../../Auth/AuthProvider";
import NavBar from "../../../../Design/NavBar/NavBar";
import MainHeader from "../../../../Design/MainHeader/MainHeader";
import { Link, NavLink } from "react-router-dom";
import Button from "../../../../Design/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import {
    AuthRoutes,
    PropertiesRoutes,
    RealtorRoutes,
    route,
    UserRoutes,
} from "../../../../../core/routing";
import { useTranslation } from "react-i18next";
import useAdmin from "../../../../../core/hooks/useAdmin";
import useRealtor from "../../../../../core/hooks/useRealtor";

const Header = () => {
    const { auth, logout } = useAuthContext();
    const { t } = useTranslation();
    const admin = useAdmin();
    const realtor = useRealtor();

    return (
        <MainHeader type={"login"}>
            <NavBar>
                <div className="nav__links">
                    <NavLink to={PropertiesRoutes.Index}>
                        {t("navigation.home")}
                    </NavLink>
                    {admin && (
                        <NavLink to="/admin/dashboard">
                            {t("navigation.admin")}
                        </NavLink>
                    )}
                    {/* Realtor routes */}
                    {realtor && (
                        <>
                            <NavLink to={RealtorRoutes.Dashboard}>
                                {t("navigation.dashboard")}
                            </NavLink>
                            <NavLink to={RealtorRoutes.Office}>
                                {t("navigation.office")}
                            </NavLink>
                        </>
                    )}
                    {/* In case user is not admin and not realtor see rent, sale and favourites */}
                    {!admin && !realtor && (
                        <>
                            <NavLink to="/for-rent">
                                {t("navigation.rent")}
                            </NavLink>
                            <NavLink to="/for-sale">
                                {t("navigation.sale")}
                            </NavLink>
                            {/* Logged in */}
                            {auth && (
                                <NavLink to="/favourites">
                                    {t("navigation.favourites")}
                                </NavLink>
                            )}
                        </>
                    )}
                </div>
                <h1>
                    <FontAwesomeIcon icon={faPeopleRoof} /> {t("name")}
                </h1>
                {/* Logged out */}
                {!auth && (
                    <div className="accountBtns">
                        <Link to={AuthRoutes.Login}>
                            <Button color="primary">
                                {t("onboarding.login.title")}
                            </Button>
                        </Link>
                        <Link to={AuthRoutes.Register}>
                            <Button color="secondary">
                                {t("onboarding.register.title")}
                            </Button>
                        </Link>
                    </div>
                )}
                {/* Logged in */}
                {auth && (
                    <div className="accountBtns">
                        <NavLink
                            className="mr-4"
                            to={route(UserRoutes.Account, {
                                id: auth.user.id,
                            })}>
                            <FontAwesomeIcon icon={faUser} />{" "}
                            {t("navigation.account")}
                        </NavLink>
                        <Button color="logout" onClick={logout}>
                            {t("navigation.logout")}
                        </Button>
                    </div>
                )}
            </NavBar>
        </MainHeader>
    );
};

export default Header;
