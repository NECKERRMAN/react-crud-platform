import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../../core/hooks/useMutation";
import { route, UserRoutes } from "../../../../../../core/routing";
import Alert from "../../../../../Design/Alert/Alert";
import MessageForm from "../../../../Shared/Messages/MessageForm";
import "./RealtorContact.css";

const RealtorContact = ({ property, onContact }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isLoading, error, mutate } = useMutation();

    if (error) {
        <Alert>{error}</Alert>;
    }

    const handleSubmit = (data) => {
        console.log(data);
        mutate(`${process.env.REACT_APP_API_URL}/send-message`, {
            method: "POST",
            data,
            onSuccess: () => {
                onContact();
                navigate(route(UserRoutes.Favourites));
            },
        });
    };

    return (
        <aside>
            <h2>{t("properties.realtorcontact.contact")}</h2>
            <p>{property.office.contactName}</p>
            <p>{property.office.contactEmail}</p>
            <MessageForm
                onSubmit={handleSubmit}
                isDisabled={isLoading}
                officeId={property.office.id}
                propertyId={property.id}
                label={t("buttons.send")}
            />
        </aside>
    );
};

export default RealtorContact;
