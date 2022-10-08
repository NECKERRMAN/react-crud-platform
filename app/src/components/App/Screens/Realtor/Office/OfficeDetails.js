import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import useMutation from "../../../../../core/hooks/useMutation";
import { RealtorRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import Title from "../../../../Design/Title/Title";
import OfficeForm from "../../../Shared/Offices/Form/OfficeForm";
import "./OfficeDetails.css";

const OfficeDetails = ({ office, onUpdate }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isLoading, error, mutate } = useMutation();

    if (error) {
        return <Alert>{error}</Alert>;
    }

    const handleSubmit = (data) => {
        mutate(`${process.env.REACT_APP_API_URL}/realtor/office/${office.id}`, {
            method: "PATCH",
            data,
            multipart: true,
            onSucces: () => {
                onUpdate();
                navigate(route(RealtorRoutes.Office));
            },
        });
    };

    return (
        <>
            <Title type="medium">{t("realtors.office.details")}</Title>
            <Container className="office">
                <div className="office__image">
                    <img
                        className="office__image"
                        src={getImagePath(office.officeImage)}
                        alt=""
                    />
                </div>
                <div className="office__content">
                    <OfficeForm
                        initialData={office}
                        isDisabled={isLoading}
                        onSubmit={handleSubmit}
                        label={t("buttons.update")}
                    />
                </div>
            </Container>
        </>
    );
};

export default OfficeDetails;
