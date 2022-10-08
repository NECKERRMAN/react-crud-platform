import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import Form from "../../../../Design/Form/Form";
import Button from "../../../../Design/Button/Button";
import { useSearchParams } from "react-router-dom";
import Container from "../../../../Design/Container/Container";
import Label from "../../../../Design/Form/Label";
import FormGroup from "../../../../Design/Form/FormGroup";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
    price: yup.string().nullable().required(),
});

const PriceFilter = ({ onFilter, initial, checkQuery }) => {
    const [searchParams, setSearchParams] = useSearchParams("");
    const { t } = useTranslation();

    const onSubmit = (data) => {
        let params = data.price;
        if (params === "--") {
            setSearchParams({});
        } else {
            setSearchParams({ price: params });
        }
        onFilter();

        checkQuery("price", data.price);
    };

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        price: "" || initial,
    });

    const handleData = (values) => {
        searchParams.get("price");
        onSubmit(values);
    };

    return (
        <Form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <Container className="flex items-end mb-4 mr-4">
                <FormGroup type="small">
                    <Label>{t("filters.price")}</Label>
                    {/* City Select Filter filters on city name instead of ID */}
                    <select
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        error={errors.price}>
                        <option value="--">--</option>
                        <option value="desc">Highest first</option>
                        <option value="asc">Lowest first</option>
                    </select>
                </FormGroup>

                <div className="ml-4">
                    <Button type="submit">{t("buttons.search")}</Button>
                </div>
            </Container>
        </Form>
    );
};

export default PriceFilter;
