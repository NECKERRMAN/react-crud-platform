import { useState } from "react";
import { useTranslation } from "react-i18next";
import useMutation from "../../../../core/hooks/useMutation";
import Container from "../../../Design/Container/Container";
import Title from "../../../Design/Title/Title";
import { useAuthContext } from "../AuthProvider";
import { LoginForm } from "./LoginForm";

const LoginScreen = () => {
    const { login } = useAuthContext();
    const { t } = useTranslation();
    const [data, setData] = useState({
        email: "",
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

        mutate(`${process.env.REACT_APP_API_URL}/login`, {
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
                    <Title>{t("fields.login")}</Title>
                    <LoginForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        error={error}
                        data={data}
                        isLoading={isLoading}
                    />
                </Container>
            </Container>
        </>
    );
};

export default LoginScreen;
