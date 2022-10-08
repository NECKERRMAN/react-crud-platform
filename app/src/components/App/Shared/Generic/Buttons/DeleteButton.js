import PropTypes from "prop-types";
import { useEffect } from "react";
import Button from "../../../../Design/Button/Button";
import useMutation from "../../../../../core/hooks/useMutation";

const DeleteButton = ({ onSuccess, id, label, scope, disabled, ...rest }) => {
    const { isLoading, error, mutate } = useMutation();

    const handleClick = () => {
        mutate(`${process.env.REACT_APP_API_URL}/${scope}/${id}`, {
            method: "DELETE",
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    useEffect(() => {
        if (error) {
            window.alert(error);
        }
    }, [error]);

    return (
        <Button
            color="delete"
            onClick={handleClick}
            disabled={disabled || isLoading}
            {...rest}>
            {label}
        </Button>
    );
};

DeleteButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    ...Button.propTypes,
};

export default DeleteButton;
