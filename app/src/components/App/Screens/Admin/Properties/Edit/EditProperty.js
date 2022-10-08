import { t } from "i18next";
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../../../core/hooks/useFetch";
import Alert from "../../../../../Design/Alert/Alert";
import Container from "../../../../../Design/Container/Container";
import Title from "../../../../../Design/Title/Title";
import LoadingIndicator from "../../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Edit from "./Edit";

export const EditProperty = () => {
    const { id } = useParams();

    const {
        isLoading,
        error,
        invalidate,
        data: property,
    } = useFetch(`/realtor/detail/${id}`);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <Alert>{error}</Alert>;
    }

    return (
        <>
            <Title type="medium">{t("admin.properties.edit")}</Title>
            <Container className="mb-4">
                <Edit property={property} onEdit={invalidate} />
            </Container>
        </>
    );
};
