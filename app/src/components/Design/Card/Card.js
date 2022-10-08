import "./Card.css";
import PropTypes from "prop-types";
import { getImagePath } from "../../../core/helpers/api";

const Card = ({ property }) => {
    return (
        <div className="card">
            <div
                className="card__image"
                style={{
                    backgroundImage: `url('${getImagePath(property.imgSrc)}')`,
                }}></div>
            <div className="card__content">
                <div className="card__adress">
                    <div className="card__adress-blurred"></div>
                    <h1>{property.adress}</h1>
                </div>
                <h2 className="card__region">{property.cityId}</h2>
                <div className="card__price">
                    <p>€ {property.price}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;

Card.propTypes = {
    property: PropTypes.object,
};
