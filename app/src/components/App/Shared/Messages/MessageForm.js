import Button from "../../../Design/Button/Button";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import Form from "../../../Design/Form/Form";
import * as yup from "yup";
import useForm from "../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
    content: yup.string().required(),
});

const MessageForm = ({
    initialData = {},
    isDisabled,
    onSubmit,
    label,
    officeId,
    propertyId,
}) => {
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        content: "",
        isRead: false,
        propertyId: propertyId,
        officeId: officeId,
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <Form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Label htmlFor="content">{t("fields.message")}</Label>
                <Input
                    name="content"
                    type="text"
                    disabled={isDisabled}
                    value={values.content}
                    onChange={handleChange}
                    error={errors.content}
                    placeholder={t("fields.placeholder-contact")}
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

export default MessageForm;
