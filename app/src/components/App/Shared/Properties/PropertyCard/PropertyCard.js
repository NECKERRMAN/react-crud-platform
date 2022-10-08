import { useAuthContext } from "../../../Auth/AuthProvider";
import "./PropertyCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faBath,
    faBed,
    faArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getImagePath } from "../../../../../core/helpers/api";
import formatPrice from "../../../../../core/Utils/formatPrice";
import FavouriteButton from "../../Generic/Buttons/FavouriteButton";
import { PropertiesRoutes, route } from "../../../../../core/routing";

const PropertyCard = ({ property, isLoading }) => {
    const { auth } = useAuthContext();
    const { t } = useTranslation();

    let isAuth = false;
    if (auth) {
        isAuth = true;
    }

    return (
        <div>
            <div
                className={
                    property.status === "RENTED" || property.status === "SOLD"
                        ? "propertyCard--sold"
                        : "propertyCard"
                }>
                <div
                    /* Added to fix Heroku issue where no images are available */
                    className="propertyCard__image">
                    <img
                        src={
                            process.env.ENV !== "production"
                                ? getImagePath(property.propertyImage)
                                : property.propertyImage
                        }
                        alt="property"
                        className="propertyCard__image--img"
                    />
                    {isAuth ? (
                        <div className="propertyCard__favourite">
                            <FavouriteButton
                                disabled={isLoading}
                                property={property}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <Link
                    to={route(PropertiesRoutes.Detail, { id: property.id })}
                    className="propertyCard__content">
                    <p className="propertyCard__content--category">
                        {property.category.name}
                    </p>
                    <div
                        className={
                            isAuth
                                ? "propertyCard__adress"
                                : "propertyCard__adress--blurred"
                        }>
                        <h1>
                            {isAuth
                                ? property.adress
                                : t("properties.card.placeholder")}
                        </h1>
                    </div>
                    <h2 className="propertyCard__region">
                        {property.city.name}
                    </h2>
                    <div className="propertyCard__price">
                        <p>{formatPrice(property.price)}</p>
                    </div>
                    <div className="propertyCard__details">
                        <div>
                            <FontAwesomeIcon icon={faHouse} />
                            <p>{property.rooms}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBath} />
                            <p>{property.bathrooms}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBed} />
                            <p>{property.bedrooms}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faArrowsLeftRight} />
                            <p>
                                {property.sqrFt} m<sup>2</sup>
                            </p>
                        </div>
                    </div>
                    <div className="propertyCard__banner">
                        {property.status}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
