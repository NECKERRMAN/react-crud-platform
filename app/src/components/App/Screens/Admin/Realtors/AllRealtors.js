import { useState } from "react";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import Alert from "../../../../Design/Alert/Alert";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import RealtorOverview from "./RealtorOverview/RealtorOverview";
import AddRealtor from "./AddRealtor/AddRealtor";
import useFetch from "../../../../../core/hooks/useFetch";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import BackButton from "../../../../Design/Button/BackButton";
import { AdminRoutes, route } from "../../../../../core/routing";

const AllRealtors = () => {
    const { t } = useTranslation();
    useTitle(t("admin.realtors.all"));

    /* MODAL */
    const [openModal, setOpenModal] = useState(false);
    const handleModal = () => {
        setOpenModal(true);
    };
    const closeModal = () => {
        setOpenModal(false);
    };

    /* GET REALTORS */
    const {
        isLoading,
        data: realtors,
        error,
        invalidate,
    } = useFetch("/admin/realtors/");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    const handleNewRealtor = () => {
        invalidate();
    };

    return (
        <>
            <BackButton href={route(AdminRoutes.Dashboard)} />
            <Title>{t("admin.realtors.all")}</Title>
            <Button color="new" onClick={handleModal}>
                {t("admin.realtors.add")}
            </Button>
            <Container>
                <AddRealtor
                    openModal={openModal}
                    closeModal={closeModal}
                    onSubmit={handleNewRealtor}
                />
                <Title type="small">{t("realtors.title")}</Title>
                <RealtorOverview realtors={realtors} />
            </Container>
        </>
    );
};

export default AllRealtors;
