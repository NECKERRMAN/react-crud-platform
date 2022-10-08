import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { AdminRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import BackButton from "../../../../Design/Button/BackButton";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import OfficeForm from "../../../Shared/Offices/Form/OfficeForm";

const NewOffice = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    useTitle(t("admin.office.new"));
    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/admin/new-office`, {
            method: "POST",
            data,
            multipart: true,
            onSuccess: () => {
                navigate(AdminRoutes.Offices);
            },
        });
    };

    return (
        <>
            <BackButton href={route(AdminRoutes.Dashboard)} />
            <Title>{t("admin.office.add")}</Title>
            <Container className="mb-6">
                {error && <Alert color="danger">{error}</Alert>}
                <OfficeForm
                    label={"Add office"}
                    isDisabled={isLoading}
                    onSubmit={handleSubmit}
                />
            </Container>
        </>
    );
};

export default NewOffice;
