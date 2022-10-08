import { Routes, Route, Navigate } from "react-router-dom";
import {
    AdminRoutes,
    AuthRoutes,
    PropertiesRoutes,
    RealtorRoutes,
    UserRoutes,
} from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthProvider from "./Auth/AuthProvider";
import LoginScreen from "./Auth/Login/LoginScreen";
import OnboardingLayout from "./Auth/OnboardingLayout";
import PropertiesOverviewScreen from "./Screens/Properties/Overview/PropertiesOverviewScreen";

import AuthContainer from "./Auth/AuthContainer";
import RegisterScreen from "./Auth/Register/RegisterScreen";
import PropertiesLayout from "./Screens/Properties/PropertiesLayout";
import PropertyDetail from "./Screens/Properties/Detail/PropertyDetail";
import RentScreen from "./Screens/Properties/Rent/RentScreen";
import UserLayout from "./Screens/Users/UserLayout";
import UserAccount from "./Screens/Users/UserAccount/UserAccount";
import AdminRoute from "../../core/routing/AdminRoute";
import AdminDashboard from "./Screens/Admin/Dashboard/AdminDashboard";
import AdminOffices from "./Screens/Admin/Offices/AdminOffices";
import NewProperty from "./Screens/Admin/Properties/NewProperty";
import AllProperties from "./Screens/Admin/Properties/AllProperties";
import AllRealtors from "./Screens/Admin/Realtors/AllRealtors";
import NewOffice from "./Screens/Admin/Offices/NewOffice";
import SaleScreen from "./Screens/Properties/Sale/SaleScreen";
import RealtorRoute from "../../core/routing/RealtorRoute";
import RealtorOffice from "./Screens/Realtor/Office/RealtorOffice";
import Favourites from "./Screens/Users/Favourites/Favourites";
import Dashboard from "./Screens/Realtor/Dashboard/Dashboard";
import PropertyEditLayout from "./Screens/Realtor/Properties/PropertyEditLayout";
import Edit from "./Screens/Realtor/Properties/Edit";
import New from "./Screens/Realtor/Properties/New";
import FilterOverviewScreen from "./Shared/Properties/Filter/FilterOverview";
import { CategoryOverview } from "./Screens/Admin/Categories/CategoryOverview";
import EditRealtor from "./Screens/Admin/Realtors/Edit/EditRealtor";
import AllUsers from "./Screens/Admin/Users/AllUsers";
import EditUser from "./Screens/Admin/Users/Edit/EditUser";
import { EditProperty } from "./Screens/Admin/Properties/Edit/EditProperty";

const App = () => {
    return (
        <>
            <AuthProvider>
                <Routes>
                    {/* All unauthenticated routes here  */}
                    <Route
                        path={PropertiesRoutes.Index}
                        element={<PropertiesLayout />}>
                        <Route index element={<PropertiesOverviewScreen />} />
                        <Route
                            path={PropertiesRoutes.Filter}
                            element={<FilterOverviewScreen />}
                        />
                        <Route
                            path={PropertiesRoutes.ForRent}
                            element={<RentScreen />}
                        />
                        <Route
                            path={PropertiesRoutes.ForSale}
                            element={<SaleScreen />}
                        />
                    </Route>
                    <Route
                        path={AuthRoutes.Index}
                        element={<OnboardingLayout />}>
                        <Route
                            path={AuthRoutes.Login}
                            element={<LoginScreen />}
                        />
                        <Route
                            path={AuthRoutes.Register}
                            element={<RegisterScreen />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to={AuthRoutes.Login} />}
                        />
                    </Route>
                    {/* All authenticated routes here */}
                    <Route
                        element={
                            <AuthContainer>
                                <AppLayout />
                            </AuthContainer>
                        }>
                        <Route path={UserRoutes.Index} element={<UserLayout />}>
                            <Route
                                path={UserRoutes.Account}
                                element={<UserAccount />}
                            />
                            <Route
                                path={UserRoutes.Favourites}
                                element={<Favourites />}
                            />
                        </Route>
                        <Route
                            path={PropertiesRoutes.Detail}
                            element={<PropertyDetail />}
                        />
                    </Route>
                    {/* All realtor Routes here */}
                    <Route
                        element={
                            <RealtorRoute>
                                <AppLayout />
                            </RealtorRoute>
                        }>
                        <Route
                            path={RealtorRoutes.Index}
                            element={<Navigate to={RealtorRoutes.Dashboard} />}
                        />
                        <Route
                            path={RealtorRoutes.Dashboard}
                            element={<Dashboard />}
                        />
                        <Route
                            path={RealtorRoutes.Office}
                            element={<RealtorOffice />}
                        />
                        <Route
                            path={RealtorRoutes.Edit}
                            element={<PropertyEditLayout />}>
                            <Route index element={<Edit />} />
                        </Route>
                        <Route path={RealtorRoutes.New} element={<New />} />
                    </Route>
                    {/* All Admin Routes here */}
                    <Route
                        element={
                            <AdminRoute>
                                <AppLayout />
                            </AdminRoute>
                        }>
                        <Route
                            path={AdminRoutes.Index}
                            element={<Navigate to={AdminRoutes.Dashboard} />}
                        />
                        <Route
                            path={AdminRoutes.AllCategories}
                            element={<CategoryOverview />}
                        />
                        <Route
                            path={AdminRoutes.Dashboard}
                            element={<AdminDashboard />}
                        />
                        <Route
                            path={AdminRoutes.NewProperty}
                            element={<NewProperty />}
                        />
                        <Route
                            path={AdminRoutes.AllProperties}
                            element={<AllProperties />}
                        />
                        <Route
                            path={AdminRoutes.Realtors}
                            element={<AllRealtors />}
                        />
                        <Route
                            path={AdminRoutes.Offices}
                            element={<AdminOffices />}
                        />
                        <Route
                            path={AdminRoutes.NewOffice}
                            element={<NewOffice />}
                        />
                        <Route
                            path={AdminRoutes.EditRealtor}
                            element={<EditRealtor />}
                        />
                        <Route
                            path={AdminRoutes.Users}
                            element={<AllUsers />}
                        />
                        <Route
                            path={AdminRoutes.EditUser}
                            element={<EditUser />}
                        />
                        <Route
                            path={AdminRoutes.EditProperty}
                            element={<EditProperty />}
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
};

export default App;
