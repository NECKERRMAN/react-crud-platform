import { t } from "i18next";
import { useOutletContext } from "react-router-dom";
import RealtorForm from "../../../Shared/Users/Form/RealtorForm";

const NewRealtor = () => {
    const { user } = useOutletContext();
    return (
        <RealtorForm
            officeId={user ? user.office.id : "0"}
            label={t("realtors.create.name")}
        />
    );
};

export default NewRealtor;
