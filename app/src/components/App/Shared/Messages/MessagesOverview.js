import useFetch from "../../../../core/hooks/useFetch";
import Alert from "../../../Design/Alert/Alert";
import MessageCard from "../../../Design/Messages/MessageCard";
import LoadingIndicator from "../Generic/LoadingIndicator/LoadingIndicator";

const MessagesOverview = () => {
    const { isLoading, data: messages, error } = useFetch("/messages");

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            {messages.map((message) => (
                <MessageCard key={message.id} message={message} />
            ))}
        </>
    );
};

export default MessagesOverview;
