import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import PropertyCard from "../../../Shared/Properties/PropertyCard/PropertyCard";
import useTitle from "../../../../../core/hooks/useTitle";
import { useTranslation } from "react-i18next";

const RentScreen = () => {
    const { t } = useTranslation();
    const { isLoading, data: properties, error } = useFetch("/properties-rent");

    useTitle(t("properties.rent.title"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <Title>{t("properties.rent.title")}</Title>
            <Container type="cards-overview">
                {properties.length === 0 && (
                    <Alert color="info">{t("properties.overview.none")}</Alert>
                )}
                {properties &&
                    properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
            </Container>
        </>
    );
};

export default RentScreen;
