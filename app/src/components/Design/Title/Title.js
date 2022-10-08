import PropTypes from "prop-types";
import "./Title.css";

const Title = ({ type = "big", children }) => {
    return <p className={`title title--${type}`}>{children}</p>;
};

Title.propTypes = {
    type: PropTypes.oneOf(["big", "medium", "small"]),
};

export default Title;
