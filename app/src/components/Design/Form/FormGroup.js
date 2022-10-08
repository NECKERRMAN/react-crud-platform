import "./FormGroup.css";
import PropTypes from "prop-types";

const FormGroup = ({ type = "standard", children, grid = "" }) => {
    return <div className={`formGroup--${type} ${grid}`}>{children}</div>;
};

FormGroup.propTypes = {
    type: PropTypes.oneOf(["standard", "small"]),
};
export default FormGroup;
