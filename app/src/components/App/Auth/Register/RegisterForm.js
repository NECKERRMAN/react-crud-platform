import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../Design/Button/Button";
import Form from "../../../Design/Form/Form";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";

export const RegisterForm = ({
    handleChange,
    handleSubmit,
    error,
    data,
    isLoading,
}) => {
    const { t } = useTranslation();

    return (
        <Form onSubmit={handleSubmit} type={"login"}>
            {error && <p>{error}</p>}
            <FormGroup>
                <label htmlFor="name">{t("fields.name")}</label>
                <Input
                    name="name"
                    placeholder="Saul"
                    value={data.name}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="surname">{t("fields.surname")}</Label>
                <Input
                    name="surname"
                    placeholder="Goodman"
                    value={data.surname}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">{t("fields.email")}</Label>
                <Input
                    name="email"
                    type="email"
                    placeholder="e.g. saul.goodman@lwyrup.com"
                    value={data.email}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="phone">{t("fields.phone")}</Label>
                <Input
                    name="phone"
                    type="tel"
                    placeholder="0032 456 789 012"
                    value={data.phone}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">{t("fields.password")}</Label>
                <Input
                    name="password"
                    type="password"
                    placeholder="*******"
                    value={data.password}
                    onChange={handleChange}
                />
            </FormGroup>
            <Button type="submit" color="login-form" disabled={isLoading}>
                {t("onboarding.register.title")}
            </Button>
        </Form>
    );
};
