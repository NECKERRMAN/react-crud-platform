import React from "react";
import { useTranslation } from "react-i18next";
import Table from "../../../../Design/Table/Table";
import TableHeader from "../../../../Design/Table/TableHeader";
import TableRow from "../../../../Design/Table/TableRow";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";

export const Categories = ({ isLoading, categories, onDelete }) => {
    const { t } = useTranslation();

    return (
        <Table
            header={
                <TableHeader>
                    <th>{t("categories.id")}</th>
                    <th>{t("categories.name")}</th>
                    <th>{t("categories.key")}</th>
                    <th>{t("categories.action")}</th>
                </TableHeader>
            }>
            {categories.map((cat) => (
                <TableRow key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.key}</td>
                    <td>
                        <DeleteButton
                            scope="admin/categories"
                            id={cat.id}
                            onSuccess={onDelete}
                            label={t("buttons.delete")}
                        />
                    </td>
                </TableRow>
            ))}
        </Table>
    );
};
