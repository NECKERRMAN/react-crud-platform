import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import {
    PropertiesRoutes,
    RealtorRoutes,
    route,
} from "../../../../../core/routing";
import formatPrice from "../../../../../core/Utils/formatPrice";
import Alert from "../../../../Design/Alert/Alert";
import Button from "../../../../Design/Button/Button";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const DashboardProperties = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        data: properties,
        error,
        invalidate,
    } = useFetch("/realtor/properties");

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
        <Table
            header={
                <TableHeader>
                    <th>{t("properties.detail.adress")}</th>
                    <th>{t("properties.detail.city")}</th>
                    <th>{t("properties.detail.price")}</th>
                    <th>{t("properties.detail.status")}</th>
                    <th>{t("properties.detail.action")}</th>
                </TableHeader>
            }>
            {properties.map((property) => (
                <TableRow key={property.id}>
                    <td className="underline pl-4">
                        <Link
                            to={route(PropertiesRoutes.Detail, {
                                id: property.id,
                            })}>
                            {property.adress} ({t("properties.detail.title")})
                        </Link>
                    </td>
                    <td>{property.city.name}</td>
                    <td>{formatPrice(property.price)}</td>
                    <td>{property.status}</td>
                    <td>
                        <Link
                            to={route(RealtorRoutes.Edit, {
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
    );
};

export default DashboardProperties;
