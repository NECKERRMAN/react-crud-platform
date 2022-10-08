import { useTranslation } from "react-i18next";
import { formatName } from "../../../../../../core/Utils/formatName";
import Button from "../../../../../Design/Button/Button";
import Table from "../../../../../Design/Table/Table";
import TableHeader from "../../../../../Design/Table/TableHeader";
import TableRow from "../../../../../Design/Table/TableRow";
import DeleteButton from "../../../../Shared/Generic/Buttons/DeleteButton";
import { Link } from "react-router-dom";
import { AdminRoutes, route } from "../../../../../../core/routing/index";

const UsersOverview = ({ users, onDelete }) => {
    const { t } = useTranslation();

    return (
        <>
            <Table
                header={
                    <TableHeader>
                        <th>{t("fields.id")}</th>
                        <th>{t("fields.name")}</th>
                        <th>{t("fields.role")}</th>
                        <th>{t("fields.action")}</th>
                    </TableHeader>
                }>
                {users &&
                    users.map((user) => (
                        <TableRow key={user.id}>
                            <td>{user.id}</td>
                            <td>{formatName(user)}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link
                                    to={route(AdminRoutes.EditUser, {
                                        id: user.id,
                                    })}>
                                    <Button>{t("buttons.edit")}</Button>
                                </Link>
                                <DeleteButton
                                    scope="admin/users"
                                    id={user.id}
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

export default UsersOverview;
