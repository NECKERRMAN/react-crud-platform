import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import Form from "../../../../Design/Form/Form";
import Button from "../../../../Design/Button/Button";
import { useNavigate } from "react-router-dom";
import Container from "../../../../Design/Container/Container";
import Label from "../../../../Design/Form/Label";
import FormGroup from "../../../../Design/Form/FormGroup";
import CitySelectFilter from "../../Cities/Select/CitySelectFilter";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
    city: yup.string().nullable().required(),
});

const CityFilter = ({ onFilter, initial }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onSubmit = (data) => {
        navigate(`/filter/${data.city}`);
    };

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        city: "" || initial,
    });

    const handleData = (values) => {
        onFilter();
        onSubmit(values);
    };

    return (
        <Form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <Container className="flex items-end mb-4 md:ml-4 ml-0">
                <FormGroup type="small">
                    <Label>{t("fields.city")}</Label>
                    {/* City Select Filter filters on city name instead of ID */}
                    <CitySelectFilter
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        error={errors.city}
                    />
                </FormGroup>

                <div className="ml-4">
                    <Button type="submit">{t("buttons.city-filter")}</Button>
                </div>
            </Container>
        </Form>
    );
};

export default CityFilter;
