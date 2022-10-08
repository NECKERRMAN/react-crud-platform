import React from "react";
import { useTranslation } from "react-i18next";
import useForm from "../../../../../core/hooks/useForm";
import Form from "../../../../Design/Form/Form";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import Button from "../../../../Design/Button/Button";

const schema = yup.object().shape({
    name: yup.string().required(),
    key: yup.string().required(),
});

const CategoryForm = ({ initialData = {}, isDisabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        key: "",
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    };
    return (
        <Form onSubmit={handleSubmit(handleData)} noValidate={true} type="new">
            <FormGroup>
                <Label htmlFor="name">{t("fields.name")}</Label>
                <Input
                    name="name"
                    disabled={isDisabled}
                    value={values.name.toUpperCase()}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="key">{t("fields.key")}</Label>
                <Input
                    name="key"
                    disabled={isDisabled}
                    value={values.key}
                    onChange={handleChange}
                    error={errors.key}
                />
            </FormGroup>

            <div className="col-span-full">
                <Button type="submit" disabled={isDisabled}>
                    {label}
                </Button>
            </div>
        </Form>
    );
};

export default CategoryForm;
