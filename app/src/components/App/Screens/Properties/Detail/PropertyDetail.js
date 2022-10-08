import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import { useTranslation } from "react-i18next";
import Title from "../../../../Design/Title/Title";
import { Link, useParams } from "react-router-dom";
import useTitle from "../../../../../core/hooks/useTitle";
import { getImagePath } from "../../../../../core/helpers/api";
import PropertyDetails from "../../../../Design/PropertyDetails/PropertyDetails";
import RealtorContact from "./RealtorContact/RealtorContact";
import RealtorContainer from "../../../Shared/RealtorContainer/RealtorContainer";
import {
    PropertiesRoutes,
    RealtorRoutes,
    route,
} from "../../../../../core/routing";
import Button from "../../../../Design/Button/Button";
import BackButton from "../../../../Design/Button/BackButton";

const PropertyDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    useTitle(t("properties.detail.title"));
    const {
        isLoading,
        data: property,
        error,
        invalidate,
    } = useFetch(`/property/${id}`);

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    const sendMessage = () => {
        invalidate();
    };

    return (
        <>
            {property && (
                <>
                    <BackButton href={route(PropertiesRoutes.Index)} />
                    <RealtorContainer>
                        <Link
                            to={route(RealtorRoutes.Edit, {
                                id: property.id,
                            })}>
                            <Button type="inline-btn">
                                {t("buttons.edit")}
                            </Button>
                        </Link>
                    </RealtorContainer>
                    <Title>
                        {property.adress}
                        {property.buyOrRent === 0
                            ? ` - ${t("properties.detail.rent")}`
                            : ` - ${t("properties.detail.sale")}`}
                    </Title>
                    <Container type="property-detail">
                        <img
                            className="property-detail__image"
                            src={getImagePath(property.propertyImage)}
                            alt={property.adress}
                        />
                        <Container type="flex">
                            <PropertyDetails property={property} />
                            <RealtorContact
                                property={property}
                                onContact={sendMessage}
                            />
                        </Container>
                    </Container>
                </>
            )}
        </>
    );
};

export default PropertyDetail;
