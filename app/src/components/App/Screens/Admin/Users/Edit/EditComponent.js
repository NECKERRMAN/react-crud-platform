import React from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../../core/hooks/useMutation";
import { AdminRoutes } from "../../../../../../core/routing";
import UserForm from "../../../../Shared/Users/Form/UserForm";
import Alert from "../../../../../Design/Alert/Alert";

export const EditComponent = ({ user, id, onSubmit }) => {
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();
    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/admin/edit-user/${id}`, {
            method: "PATCH",
            data,
            onSuccess: () => {
                navigate(AdminRoutes.Users);
                onSubmit();
            },
        });
    };

    if (error) {
        <Alert>{error}</Alert>;
    }

    console.log(user.office);
    return (
        <UserForm
            initialData={user}
            onSubmit={handleSubmit}
            isDisabled={isLoading}
            label={"Update"}
            officeId={user.office !== null ? user.office.id : null}
        />
    );
};
