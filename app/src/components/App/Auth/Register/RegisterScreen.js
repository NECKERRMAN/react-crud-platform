import { useState } from "react";
import useMutation from "../../../../core/hooks/useMutation";
import Container from "../../../Design/Container/Container";
import { useAuthContext } from "../AuthProvider";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../core/hooks/useTitle";
import Title from "../../../Design/Title/Title";
import { RegisterForm } from "./RegisterForm";

const RegisterScreen = () => {
    const { login } = useAuthContext();
    const { t } = useTranslation();

    useTitle(t("onboarding.register.title"));
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const { isLoading, error, mutate } = useMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        mutate(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            data,
            onSuccess: (data) => {
                login(data);
            },
        });
    };

    return (
        <>
            <Container type="login">
                <Container type="background" />
                <Container type="login-form">
                    <Title>{t("onboarding.register.title")}</Title>
                    <RegisterForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        error={error}
                        data={data}
                        isLoading={isLoading}
                    />
                </Container>
            </Container>
        </>
    );
};

export default RegisterScreen;
