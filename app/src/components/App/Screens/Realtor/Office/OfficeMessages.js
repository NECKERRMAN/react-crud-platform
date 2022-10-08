import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert/Alert";
import MessageCard from "../../../../Design/Messages/MessageCard";
import Title from "../../../../Design/Title/Title";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const OfficeMessages = () => {
    const { t } = useTranslation();
    const {
        isLoading,
        error,
        data: messages,
    } = useFetch("/realtor/office-messages");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <div>
            <Title type="medium">{t("realtors.office.messages")}</Title>
            {messages &&
                messages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
        </div>
    );
};

export default OfficeMessages;
