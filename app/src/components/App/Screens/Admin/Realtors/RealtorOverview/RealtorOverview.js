import { useTranslation } from "react-i18next";
import { formatName } from "../../../../../../core/Utils/formatName";
import Button from "../../../../../Design/Button/Button";
import Table from "../../../../../Design/Table/Table";
import TableHeader from "../../../../../Design/Table/TableHeader";
import TableRow from "../../../../../Design/Table/TableRow";
import DeleteButton from "../../../../Shared/Generic/Buttons/DeleteButton";
import { Link } from "react-router-dom";
import { AdminRoutes, route } from "../../../../../../core/routing/index";

const RealtorOverview = ({ realtors, onDelete }) => {
    const { t } = useTranslation();

    return (
        <>
            <Table
                header={
                    <TableHeader>
                        <th>{t("realtors.fields.id")}</th>
                        <th>{t("realtors.fields.name")}</th>
                        <th>{t("realtors.fields.office")}</th>
                        <th>{t("realtors.fields.action")}</th>
                    </TableHeader>
                }>
                {realtors &&
                    realtors.map((realtor) => (
                        <TableRow key={realtor.id}>
                            <td>{realtor.id}</td>
                            <td>{formatName(realtor)}</td>
                            <td>{realtor.office.name}</td>
                            <td>
                                <Link
                                    to={route(AdminRoutes.EditRealtor, {
                                        id: realtor.id,
                                    })}>
                                    <Button>{t("buttons.edit")}</Button>
                                </Link>
                                <DeleteButton
                                    scope="admin/realtors"
                                    id={realtor.id}
                                    onSuccess={onDelete}
                                    label={t("buttons.delete")}
                                />
                            </td>
                        </TableRow>
                    ))}
            </Table>
        </>
    );
};

export default RealtorOverview;
