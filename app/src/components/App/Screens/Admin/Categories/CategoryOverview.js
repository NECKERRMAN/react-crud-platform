import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import Title from "../../../../Design/Title/Title";
import { Categories } from "./Categories";
import { NewCategory } from "./NewCategory";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Alert from "../../../../Design/Alert/Alert";
import { AdminRoutes, route } from "../../../../../core/routing";
import useTitle from "../../../../../core/hooks/useTitle";
import BackButton from "../../../../Design/Button/BackButton";

export const CategoryOverview = () => {
    const { t } = useTranslation();
    useTitle(t("categories.title"));
    const {
        isLoading,
        data: categories,
        error,
        invalidate,
    } = useFetch("/admin/categories");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    const handleDelete = () => {
        invalidate();
    };

    return (
        <>
            <BackButton href={route(AdminRoutes.Dashboard)} />
            <Title type="medium">{t("categories.title")}</Title>
            <Categories
                categories={categories}
                isLoading={isLoading}
                onDelete={handleDelete}
            />
            <Title type="medium">{t("categories.add")}</Title>
            <NewCategory onSubmit={invalidate} />
        </>
    );
};
