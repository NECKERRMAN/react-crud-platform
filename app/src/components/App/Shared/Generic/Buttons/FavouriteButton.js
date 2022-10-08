import PropTypes from "prop-types";
import { useEffect } from "react";
import Button from "../../../../Design/Button/Button";
import useMutation from "../../../../../core/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { UserRoutes } from "../../../../../core/routing/index";

const FavouriteButton = ({ disabled, property }) => {
    const { isLoading, error, mutate } = useMutation();
    const navigate = useNavigate();

    const handleClick = () => {
        mutate(`${process.env.REACT_APP_API_URL}/favourites/${property.id}`, {
            method: "POST",
            onSuccess: () => {
                navigate(UserRoutes.Favourites);
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
            disabled={disabled || isLoading}>
            <FontAwesomeIcon icon={faHeart} />
        </Button>
    );
};

FavouriteButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    ...Button.propTypes,
};

export default FavouriteButton;
