import React from "react";
import { useTranslation } from "react-i18next";
import useForm from "../../../../../core/hooks/useForm";
import Form from "../../../../Design/Form/Form";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import CitySelect from "../../Cities/Select/CitySelect";
import * as yup from "yup";
import Button from "../../../../Design/Button/Button";
import FileInput from "../../../../Design/Form/FileInput";

const schema = yup.object().shape({
    name: yup.string().required(),
    contactName: yup.string().required(),
    contactEmail: yup.string().required(),
    street: yup.string().required(),
    cityId: yup.number().required(),
});

const OfficeForm = ({ initialData = {}, isDisabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        contactName: "",
        contactEmail: "",
        street: "",
        cityId: "1",
        officeImage: "",
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
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="contactName">{t("fields.contactName")}</Label>
                <Input
                    name="contactName"
                    disabled={isDisabled}
                    value={values.contactName}
                    onChange={handleChange}
                    error={errors.contactName}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="contactEmail">{t("fields.contactEmail")}</Label>
                <Input
                    name="contactEmail"
                    disabled={isDisabled}
                    value={values.contactEmail}
                    onChange={handleChange}
                    error={errors.contactEmail}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="street">{t("fields.street")}</Label>
                <Input
                    name="street"
                    disabled={isDisabled}
                    value={values.street}
                    onChange={handleChange}
                    error={errors.street}
                />
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="cityId">{t("fields.city")}</Label>
                <CitySelect
                    name="cityId"
                    value={values.cityId}
                    onChange={handleChange}
                    error={errors.cityId}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="officeImage">{t("fields.officeImage")}</Label>
                <FileInput
                    name="officeImage"
                    value={values.officeImage}
                    disabled={isDisabled}
                    onChange={handleChange}
                    error={errors.officeImage}
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

export default OfficeForm;
