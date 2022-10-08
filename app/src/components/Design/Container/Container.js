import "./Container.css";
import PropTypes from "prop-types";

const Container = ({ type = "standard", children, className = "" }) => {
    return <div className={`container--${type} ${className}`}>{children}</div>;
};

Container.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf([
        "standard",
        "login",
        "normal",
        "cards-overview",
        "background-blur",
        "background",
        "register",
        "login-form",
        "flex",
        "main",
        "full",
        "grid",
        "property-detail",
    ]),
};

export default Container;
