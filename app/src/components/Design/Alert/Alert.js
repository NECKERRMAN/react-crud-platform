import PropTypes from "prop-types";
import "./Alert.css";

const Alert = ({ children, type = "primary" }) => {
    return (
        <div className={`alert alert--${type}`} role="alert">
            {children}
        </div>
    );
};

export default Alert;

Alert.propTypes = {
    type: PropTypes.oneOf(["primary", "secondary", "danger", "info"]),
};
