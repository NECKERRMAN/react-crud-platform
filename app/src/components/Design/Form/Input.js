import PropTypes from "prop-types";
import "./Input.css";

const Input = ({
    type = "text",
    label,
    name,
    placeholder = "",
    onChange,
    value,
    error,
    disabled,
    ...rest
}) => {
    return (
        <>
            <input
                className={`${error ? "is-invalid" : ""}`}
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={onChange}
                {...rest}
            />
            {error && (
                <div className="invalid-feedback font-bold text-red-500">
                    {error}
                </div>
            )}
        </>
    );
};

Input.propTypes = {
    type: PropTypes.oneOf([
        "text",
        "number",
        "tel",
        "email",
        "password"
    ]),
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Input;
