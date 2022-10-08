import Button from "../../../Design/Button/Button";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import Form from "../../../Design/Form/Form";
import FileInput from "../../../Design/Form/FileInput";
import CitySelect from "../Cities/Select/CitySelect";
import * as yup from "yup";
import useForm from "../../../../core/hooks/useForm";
import OfficeSelect from "../Offices/Select/OfficeSelect";
import { useTranslation } from "react-i18next";
import StatusSelect from "./Select/StatusSelect";
import CategorySelect from "./Select/CategorySelect";

const schema = yup.object().shape({
    adress: yup.string().required(),
    cityId: yup.number().nullable().required(),
    price: yup.number().required(),
    rooms: yup.number().required(),
    bathrooms: yup.number().required(),
    bedrooms: yup.number().required(),
    sqrFt: yup.number().required(),
    categoryId: yup.number().required(),
    status: yup.string().required(),
    buyOrRent: yup.number().required(),
    officeId: yup.number().nullable().required(),
});

const PropertyForm = ({
    initialData = {},
    isDisabled,
    onSubmit,
    label,
    officeId,
}) => {

    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        adress: "",
        cityId: "",
        price: "",
        rooms: "",
        bathrooms: "",
        bedrooms: "",
        sqrFt: "",
        categoryId: "1",
        buyOrRent: "0",
        status: "FOR SALE",
        officeId: officeId,
        propertyImage: "",
        ...initialData,
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <Form onSubmit={handleSubmit(handleData)} noValidate={true} type="new">
            <FormGroup grid="col-span-6">
                <Label htmlFor="adress">{t("fields.adress")}</Label>
                <Input
                    name="adress"
                    disabled={isDisabled}
                    value={values.adress}
                    onChange={handleChange}
                    error={errors.adress}
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

            <FormGroup grid="col-span-2">
                <Label htmlFor="price">{t("fields.price")}</Label>
                <Input
                    name="price"
                    type="number"
                    disabled={isDisabled}
                    value={values.price}
                    onChange={handleChange}
                    error={errors.price}
                />
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="rooms">{t("fields.rooms")}</Label>
                <Input
                    name="rooms"
                    type="number"
                    disabled={isDisabled}
                    value={values.rooms}
                    onChange={handleChange}
                    error={errors.rooms}
                />
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="bathrooms">{t("fields.bathrooms")}</Label>
                <Input
                    name="bathrooms"
                    type="number"
                    disabled={isDisabled}
                    value={values.bathrooms}
                    onChange={handleChange}
                    error={errors.bathrooms}
                />
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="bedrooms">{t("fields.bedrooms")}</Label>
                <Input
                    name="bedrooms"
                    type="number"
                    disabled={isDisabled}
                    value={values.bedrooms}
                    onChange={handleChange}
                    error={errors.bedrooms}
                />
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="sqrFt">{t("fields.surface")}</Label>
                <Input
                    type="number"
                    name="sqrFt"
                    disabled={isDisabled}
                    value={values.sqrFt}
                    onChange={handleChange}
                    error={errors.sqrFt}
                />
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="categoryId">{t("fields.category")}</Label>
                <CategorySelect
                    name="categoryId"
                    value={values.categoryId}
                    onChange={handleChange}
                    error={errors.categoryId}
                />
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="buyOrRent">{t("fields.listed")}</Label>
                <select
                    name="buyOrRent"
                    id="buyOrRent"
                    onChange={handleChange}
                    value={values.buyOrRent}
                    error={errors.buyOrRent}>
                    <option value="0">{t("properties.rent.title")}</option>
                    <option value="1">{t("properties.sale.title")}</option>
                </select>
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="status">{t("fields.status")}</Label>
                <StatusSelect
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    error={errors.status}
                />
            </FormGroup>

            <FormGroup grid="col-span-2">
                <Label htmlFor="officeId">{t("fields.office")}</Label>
                <OfficeSelect
                    name="officeId"
                    value={values.officeId}
                    onChange={handleChange}
                    error={errors.officeId}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="propertyImage">
                    {t("fields.propertyImage")}
                </Label>
                <FileInput
                    name="propertyImage"
                    value={values.propertyImage}
                    disabled={isDisabled}
                    onChange={handleChange}
                    error={errors.propertyImage}
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

export default PropertyForm;
