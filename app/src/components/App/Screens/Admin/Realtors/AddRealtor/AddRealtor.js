import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../../core/hooks/useMutation";
import { AdminRoutes } from "../../../../../../core/routing";
import Alert from "../../../../../Design/Alert/Alert";
import Modal from "../../../../../Design/Modal/Modal";
import RealtorForm from "../../../../Shared/Users/Form/RealtorForm";

const AddRealtor = ({ openModal, closeModal, onSubmit }) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { isLoading: loader, error, mutate } = useMutation();

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/admin/new-realtor`, {
            method: "POST",
            data,
            onSuccess: () => {
                closeModal();
                onSubmit();
                navigate(AdminRoutes.Realtors);
            },
        });
    };

    return (
        <>
            {openModal && (
                <Modal onClose={closeModal} title={t("realtors.create.name")}>
                    {error && <Alert color="danger">{error}</Alert>}
                    <RealtorForm
                        label={t("realtors.create.name")}
                        isDisabled={loader}
                        onSubmit={handleSubmit}
                    />
                </Modal>
            )}
        </>
    );
};

export default AddRealtor;
