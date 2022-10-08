import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { formatName } from "../../../../../core/Utils/formatName";
import AdminContainer from "../../../Shared/AdminContainer/AdminContainer";
import { Link } from "react-router-dom";
import PropertyCard from "../../../Shared/Properties/PropertyCard/PropertyCard";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import CityFilter from "../../../Shared/Properties/Filter/CityFilter";
import CategoryFilter from "../../../Shared/Properties/Filter/CategoryFilter";
import { useState } from "react";
import { AdminRoutes, route } from "../../../../../core/routing";
import PriceFilter from "../../../Shared/Properties/Filter/PriceFilter";

const PropertiesOverviewScreen = () => {
    const { t } = useTranslation();
    const { auth } = useAuthContext();

    useTitle(t("properties.title"));
    /* Set correct values for the fetch link */
    const [query, setQuery] = useState();
    const [filter, setFilter] = useState();

    const onSubmit = (filter, data) => {
        setFilter(filter);
        setQuery(data);
    };

    const {
        isLoading,
        data: properties,
        error,
        invalidate,
    } = useFetch(`/properties?${filter}=${query}`);

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            {!auth && ""}
            {auth && (
                <>
                    <Title>Welcome {formatName(auth.user)}</Title>
                    <AdminContainer>
                        <Link
                            className="btn btn--dashboard"
                            to={route(AdminRoutes.Dashboard)}>
                            {t("properties.navigate.to")}
                        </Link>
                    </AdminContainer>
                </>
            )}
            <div className="flex md:flex-row flex-col py-2 justify-center items-center">
                <PriceFilter onFilter={invalidate} checkQuery={onSubmit} />
                <CategoryFilter onFilter={invalidate} checkQuery={onSubmit} />
                <CityFilter onFilter={invalidate} />
            </div>
            {properties.length < 1 && (
                <Alert>{t("properties.overview.none")}</Alert>
            )}
            <Container type="cards-overview">
                {properties &&
                    properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            isLoading={isLoading}
                        />
                    ))}
            </Container>
        </>
    );
};

export default PropertiesOverviewScreen;
