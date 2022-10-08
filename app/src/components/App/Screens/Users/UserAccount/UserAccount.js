import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { route, UserRoutes } from "../../../../../core/routing";
import { formatName } from "../../../../../core/Utils/formatName";
import Alert from "../../../../Design/Alert/Alert";
import Title from "../../../../Design/Title/Title";
import { useAuthContext } from "../../../Auth/AuthProvider";
import UserForm from "../../../Shared/Users/Form/UserForm";

const UserAccount = () => {
    const { user, onUserUpdate } = useOutletContext();
    const { auth } = useAuthContext();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    if (error) {
        return <Alert>{error}</Alert>;
    }

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/account`, {
            method: "PATCH",
            data,
            onSucces: () => {
                onUserUpdate();
                navigate(route(UserRoutes.Index, { id: user.id }));
            },
        });
    };

    return (
        <>
            <Title>{formatName(auth.user)}</Title>
            <UserForm
                label={"update"}
                isDisabled={isLoading}
                onSubmit={handleSubmit}
                initialData={user}
            />
        </>
    );
};

export default UserAccount;
