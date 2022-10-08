import Button from "../Button/Button";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ title, children, onClose }) => {
    return (
        <div className="modal">
            <div className="modal__title">
                <p>{title}</p>
                <Button id="modal__close" onClick={onClose}>
                    &times;
                </Button>
            </div>
            <div className="modal__content">{children}</div>
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
