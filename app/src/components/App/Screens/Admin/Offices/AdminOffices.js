import { Link } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import { AdminRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import Table from "../../../../Design/Table/Table";
import TableRow from "../../../../Design/Table/TableRow";
import TableHeader from "../../../../Design/Table/TableHeader";
import useTitle from "../../../../../core/hooks/useTitle";
import MessagesOverview from "../../../Shared/Messages/MessagesOverview";
import { useTranslation } from "react-i18next";
import BackButton from "../../../../Design/Button/BackButton";

const AdminOffices = () => {
    const { t } = useTranslation();
    useTitle(t("admin.office.all"));
    const { isLoading, data: offices, error } = useFetch("/admin/offices");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <BackButton href={route(AdminRoutes.Dashboard)} />
            <Title type="medium">{t("admin.office.all")}</Title>
            <Link className="btn btn--dashboard" to={AdminRoutes.NewOffice}>
                {t("admin.office.add")}
            </Link>
            <Container className="mt-4">
                <Table
                    header={
                        <TableHeader>
                            <th width="50">{t("fields.id")}</th>
                            <th width="200">{t("fields.name")}</th>
                            <th width="400">{t("fields.contact")}</th>
                        </TableHeader>
                    }>
                    {offices.map((office) => (
                        <TableRow key={office.id}>
                            <td>{office.id}</td>
                            <td>{office.name}</td>
                            <td>
                                {office.contactName} ({office.contactEmail})
                            </td>
                        </TableRow>
                    ))}
                </Table>
            </Container>
            <Container>
                <Title type="medium">{t("admin.office.messages")}</Title>
                <MessagesOverview />
            </Container>
        </>
    );
};

export default AdminOffices;
