import Button from "../../../../Design/Button/Button";
import Form from "../../../../Design/Form/Form";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import { useTranslation } from "react-i18next";
import OfficeSelect from "../../../Shared/Offices/Select/OfficeSelect";
import AdminContainer from "../../AdminContainer/AdminContainer";
import UserSelect from "./RoleSelect";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";

// dynamic schema
const getSchema = (isUpdate) => {
    return yup.object().shape({
        name: yup.string().required(),
        surname: yup.string().required(),
        email: yup.string().email().required(),
        password: isUpdate ? yup.string() : yup.string().required(),
        officeId: yup.number().nullable(),
    });
};

const transformValues = (values) => {
    // don't send password if it's empty
    if (values.password.length === 0) {
        const { password, ...rest } = values; // or use "delete" keyword
        values = rest;
    }
    return values;
};

const UserForm = ({
    initialData = {},
    isDisabled,
    onSubmit,
    label,
    officeId = null,
}) => {
    const { t } = useTranslation();

    const isUpdate = !!initialData.id;
    const { values, errors, handleChange, handleSubmit } = useForm(
        getSchema(isUpdate),
        {
            name: "",
            surname: "",
            email: "",
            password: "",
            officeId: officeId || null,
            ...initialData,
        }
    );

    const handleData = (values) => {
        onSubmit(transformValues(values));
    };

    return (
        <Form onSubmit={handleSubmit(handleData)} type={"userAccount"}>
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
                <Label htmlFor="surname">{t("fields.surname")}</Label>
                <Input
                    name="surname"
                    disabled={isDisabled}
                    value={values.surname}
                    onChange={handleChange}
                    error={errors.surname}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="phone">{t("fields.phone")}</Label>
                <Input
                    name="phone"
                    type="tel"
                    disabled={isDisabled}
                    value={values.phone}
                    onChange={handleChange}
                    error={errors.phone}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">{t("fields.email")}</Label>
                <Input
                    name="email"
                    type="email"
                    disabled={isDisabled}
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                />
            </FormGroup>

            <AdminContainer>
                <FormGroup>
                    <Label htmlFor="role">{t("fields.role")}</Label>
                    <UserSelect
                        name="role"
                        type="text"
                        disabled={isDisabled}
                        value={values.role}
                        onChange={handleChange}
                        error={errors.role}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="officeId">{t("fields.office")}</Label>
                    <OfficeSelect
                        name="officeId"
                        value={values.officeId}
                        onChange={handleChange}
                        error={errors.officeId}
                    />
                </FormGroup>
            </AdminContainer>

            <Button type="submit" disabled={isDisabled}>
                {label}
            </Button>
        </Form>
    );
};

export default UserForm;
