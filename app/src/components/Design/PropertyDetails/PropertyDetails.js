import "./PropertyDetails.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const PropertyDetails = ({ property }) => {
    const { t } = useTranslation();
    return (
        <div className="property-detail__details">
            <h2>Location</h2>
            <ul>
                <li>{property.adress}</li>
                <li>
                    {property.city.zipcode} - {property.city.name}
                </li>
            </ul>
            <h2>Details</h2>
            <ul>
                <li>
                    <span>{property.rooms}</span>
                    {t("properties.detail.rooms")}
                </li>
                <li>
                    <span>{property.bathrooms}</span>
                    {property.bathrooms > 1
                        ? t("properties.detail.bathrooms")
                        : t("properties.detail.bathroom")}
                </li>
                <li>
                    <span>{property.bedrooms}</span>
                    {property.bedrooms > 1
                        ? t("properties.detail.bedrooms")
                        : t("properties.detail.bedroom")}
                </li>
                <li>
                    <span>
                        {property.sqrFt} M<sub>2</sub>
                    </span>
                    {t("properties.detail.surface")}
                </li>
            </ul>
        </div>
    );
};

PropertyDetails.propTypes = {
    property: PropTypes.object,
};

export default PropertyDetails;
