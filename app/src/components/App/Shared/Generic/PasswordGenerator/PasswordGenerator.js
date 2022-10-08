import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Design/Button/Button";
import { useTranslation } from "react-i18next";

function generate() {
    let chars =
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

const PasswordGenerator = ({
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
    const [inputType, setInputType] = useState(false);
    const { t } = useTranslation();

    const onClick = () => {
        onChange({ target: { name, value: generate() } });
    };

    const handleType = () => {
        setInputType(!inputType);
    };

    return (
        <>
            <div className="flex">
                <input
                    className={`${error ? "is-invalid" : ""} w-full`}
                    type={inputType ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    {...rest}
                />
                <button type="button" onClick={handleType}>
                    <FontAwesomeIcon className="p-4" icon={faEye} />
                </button>
            </div>
            <Button type="button" color="password" onClick={onClick}>
                {t("buttons.generate")}
            </Button>
            {error && (
                <div className="invalid-feedback font-bold text-red-500">
                    {error}
                </div>
            )}
        </>
    );
};

PasswordGenerator.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default PasswordGenerator;
