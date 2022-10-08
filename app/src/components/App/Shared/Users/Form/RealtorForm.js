import Button from "../../../../Design/Button/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import OfficeSelect from "../../../Shared/Offices/Select/OfficeSelect";
import PasswordGenerator from "../../Generic/PasswordGenerator/PasswordGenerator";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    phone: yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    officeId: yup.number().required(),
});

const RealtorForm = ({
    initialData = {},
    isDisabled,
    onSubmit,
    label,
    officeId = 0,
}) => {
    const { t } = useTranslation();

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        role: "REALTOR",
        officeId: officeId,
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <form
            className="border-2 p-4 mb-6 rounded border-[#001d6e]"
            onSubmit={handleSubmit(handleData)}
            noValidate={true}
            type={"userAccount"}>
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

            <FormGroup>
                <Label htmlFor="password">{t("fields.password-realtor")}</Label>
                <PasswordGenerator
                    name="password"
                    type="password"
                    disabled={isDisabled}
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
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

            <Button type="submit" disabled={isDisabled}>
                {label}
            </Button>
        </form>
    );
};

export default RealtorForm;
