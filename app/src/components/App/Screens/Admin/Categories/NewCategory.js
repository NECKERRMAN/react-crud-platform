import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { AdminRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import CategoryForm from "../../../Shared/Categories/Form/CategoryForm";

export const NewCategory = ({ onSubmit }) => {
    const navigate = useNavigate();
    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        console.log(data);
        mutate(`${process.env.REACT_APP_API_URL}/admin/new-category`, {
            method: "POST",
            data,
            onSuccess: () => {
                onSubmit();
                navigate(AdminRoutes.AllCategories);
            },
        });
    };

    return (
        <Container className="mb-4">
            {error && <Alert>{error}</Alert>}
            <CategoryForm
                label={t("categories.add")}
                isDisabled={isLoading}
                onSubmit={handleSubmit}
            />
        </Container>
    );
};
