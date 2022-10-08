import "./VideoHeader.css";
import video from "../../../assets/video/video.mp4";
import { useTranslation } from "react-i18next";

const VideoHeader = () => {
    const { t } = useTranslation();

    return (
        <div className="videoheader">
            <video autoPlay={true} loop muted>
                <source src={video} type="video/mp4" />
            </video>
            <div className="name">
                <h1>{t("name")}</h1>
            </div>
        </div>
    );
};

export default VideoHeader;
