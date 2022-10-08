import React from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../../core/hooks/useMutation";
import { AdminRoutes } from "../../../../../../core/routing";
import UserForm from "../../../../Shared/Users/Form/UserForm";
import Alert from "../../../../../Design/Alert/Alert";

export const EditComponent = ({ realtor, id, onSubmit }) => {
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();
    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/admin/edit-realtor/${id}`, {
            method: "PATCH",
            data,
            onSuccess: () => {
                navigate(AdminRoutes.Realtors);
                onSubmit();
            },
        });
    };

    if (error) {
        <Alert>{error}</Alert>;
    }

    return (
        <UserForm
            initialData={realtor}
            onSubmit={handleSubmit}
            isDisabled={isLoading}
            label={"Update"}
            officeId={realtor.office.id}
        />
    );
};
