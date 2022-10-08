import PropTypes from "prop-types";
import "./MainHeader.css";

const MainHeader = ({ type, children }) => {
    return <header className={`mainheader--${type}`}>{children}</header>;
};

export default MainHeader;

MainHeader.propTypes = {
    type: PropTypes.oneOf(["login"]),
};
