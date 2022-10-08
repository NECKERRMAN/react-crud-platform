import { useTranslation } from "react-i18next";
import Button from "../../../Design/Button/Button";
import Form from "../../../Design/Form/Form";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";

export const LoginForm = ({
    handleSubmit,
    handleChange,
    error,
    data,
    isLoading,
}) => {
    const { t } = useTranslation();

    return (
        <Form onSubmit={handleSubmit} type={"login"}>
            {error && <p>{error}</p>}
            <FormGroup>
                <Label htmlFor="email">{t("fields.email")}</Label>
                <Input
                    name="email"
                    placeholder={t('fields.email')}
                    value={data.email}
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
                {t("buttons.login")}
            </Button>
        </Form>
    );
};
