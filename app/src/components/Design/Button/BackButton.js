import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BackButton = ({ href = "/" }) => {
    return (
        <Link
            to={href}
            className="text-muted mt-4 d-flex align-items-center color-[#001d6e] underline border-2 border-[#001d6e] rounded p-2">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ml-4">Back</span>
        </Link>
    );
};

export default BackButton;