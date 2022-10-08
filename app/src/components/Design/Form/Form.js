import PropTypes from "prop-types";
import "./Form.css";

const Form = ({ onSubmit, type, children, method = "POST" }) => {
    return (
        <form
            method={method}
            onSubmit={onSubmit}
            className={`form form--${type}`}>
            {children}
        </form>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func,
    type: PropTypes.oneOf(["login", "new", "userAccount"]),
};

export default Form;
