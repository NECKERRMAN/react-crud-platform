import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import { useAuthContext } from "../../../Auth/AuthProvider";
import { formatName } from "../../../../../core/Utils/formatName";
import AdminContainer from "../../../Shared/AdminContainer/AdminContainer";
import { Link, useParams } from "react-router-dom";
import PropertyCard from "../../../Shared/Properties/PropertyCard/PropertyCard";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import CityFilter from "../../../Shared/Properties/Filter/CityFilter";

const FilterOverviewScreen = () => {
    const { t } = useTranslation();
    const { auth } = useAuthContext();
    const { id } = useParams();
    useTitle(t("properties.title"));

    const {
        isLoading,
        data: properties,
        error,
        invalidate,
    } = useFetch(`/filter/${id}`);

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
                            to={"/admin/dashboard"}>
                            {t("properties.navigate.to")}
                        </Link>
                    </AdminContainer>
                </>
            )}
            <CityFilter onFilter={invalidate} initial={id} />
            {properties.length < 1 && <Alert>No properties yet...</Alert>}
            <Container type="cards-overview">
                {properties &&
                    properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
            </Container>
        </>
    );
};

export default FilterOverviewScreen;
