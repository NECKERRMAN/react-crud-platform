import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import Form from "../../../../Design/Form/Form";
import Button from "../../../../Design/Button/Button";
import { useSearchParams } from "react-router-dom";
import Container from "../../../../Design/Container/Container";
import Label from "../../../../Design/Form/Label";
import FormGroup from "../../../../Design/Form/FormGroup";
import CategorySelectFilter from "../../Categories/Select/CategorySelectFilter";
import { t } from "i18next";

const schema = yup.object().shape({
    category: yup.string().nullable().required(),
});

const CategoryFilter = ({ onFilter, initial, checkQuery }) => {
    const [searchParams, setSearchParams] = useSearchParams("");

    const onSubmit = (data) => {
        let params = data.category;
        if (params === "--") {
            setSearchParams({});
        } else {
            setSearchParams({ category: params });
        }
        onFilter();

        checkQuery("category", data.category);
    };

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        category: "" || initial,
    });

    const handleData = (values) => {
        searchParams.get("category");
        onSubmit(values);
    };

    return (
        <Form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <Container className="flex items-end mb-4">
                <FormGroup type="small">
                    <Label>{t("filters.category")}</Label>
                    {/* City Select Filter filters on city name instead of ID */}
                    <CategorySelectFilter
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        error={errors.category}
                    />
                </FormGroup>

                <div className="ml-4">
                    <Button type="submit">{t("buttons.search")}</Button>
                </div>
            </Container>
        </Form>
    );
};

export default CategoryFilter;
