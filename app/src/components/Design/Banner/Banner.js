import React from "react";
import PropTypes from "prop-types";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = ({
    imgSrc,
    title,
    subtitle,
    content,
    float = "normal",
    href = "",
    linkText = "",
}) => {
    return (
        <div className={`banner banner--${float}`}>
            <div className="banner__img">
                <img src={imgSrc} alt="banner" />
            </div>
            <div className="banner__content">
                <h2>{subtitle}</h2>
                <h1>{title}</h1>
                <p>{content}</p>
                <Link className="btn btn--primary" to={href}>
                    {linkText}
                </Link>
            </div>
        </div>
    );
};

Banner.propTypes = {
    imgSrc: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.string,
    float: PropTypes.oneOf(["normal", "left", "right", "center", "full"]),
};

export default Banner;
