import { Link } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import {
    AdminRoutes,
    PropertiesRoutes,
    route,
} from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import Title from "../../../../Design/Title/Title";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import formatPrice from "../../../../../core/Utils/formatPrice";
import { t } from "i18next";
import Button from "../../../../Design/Button/Button";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import BackButton from "../../../../Design/Button/BackButton";

const AllProperties = () => {
    document.title = "Admin | All Properties";

    const {
        isLoading,
        data: properties,
        error,
        invalidate,
    } = useFetch("/admin/properties");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    const handleDelete = () => {
        invalidate();
    };

    return (
        <>
            <BackButton href={route(AdminRoutes.Dashboard)} />
            <Title>{t("admin.properties.all")}</Title>
            <Link className="btn btn--dashboard" to={AdminRoutes.NewProperty}>
                {t("properties.create.add")}
            </Link>
            <Container className="my-4">
                <Table
                    header={
                        <TableHeader>
                            <th width="50">{t("fields.id")}</th>
                            <th width="250">{t("fields.adress")}</th>
                            <th width="150">{t("fields.price")}</th>
                            <th width="200">{t("fields.office")}</th>
                            <th width="100">{t("fields.status")}</th>
                            <th width="200">{t("fields.action")}</th>
                        </TableHeader>
                    }>
                    {properties.map((property) => (
                        <TableRow key={property.id}>
                            <td>{property.id}</td>
                            <td>
                                <Link
                                    className="underline pr-4"
                                    to={route(PropertiesRoutes.Detail, {
                                        id: property.id,
                                    })}>
                                    {property.adress} (Detail)
                                </Link>
                            </td>
                            <td>{formatPrice(property.price)}</td>
                            <td>{property.office.name}</td>
                            <td>{property.status}</td>
                            <td>
                                <Link
                                    to={route(AdminRoutes.EditProperty, {
                                        id: property.id,
                                    })}>
                                    <Button>{t("buttons.edit")}</Button>
                                </Link>
                                <DeleteButton
                                    scope="realtor/properties"
                                    id={property.id}
                                    onSuccess={handleDelete}
                                    label={t("buttons.delete")}
                                />
                            </td>
                        </TableRow>
                    ))}
                </Table>
            </Container>
        </>
    );
};

export default AllProperties;
