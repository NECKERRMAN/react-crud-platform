import "./MessageCard.css";
import PropTypes from "prop-types";
import { formatName } from "../../../core/Utils/formatName";

const MessageCard = ({ message }) => {
    return (
        <div className={message.isRead ? "message-card--read" : "message-card"}>
            <p className="message-card__office">{formatName(message.user)}</p>
            <p className="message-card__adress">{message.property.adress}</p>
            <p>{message.content}</p>
        </div>
    );
};

export default MessageCard;

MessageCard.propTypes = {
    message: PropTypes.object,
};
