import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert/Alert";
import Title from "../../../../Design/Title/Title";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import useTitle from "../../../../../core/hooks/useTitle";
import { useTranslation } from "react-i18next";
import PropertyCard from "../../../Shared/Properties/PropertyCard/PropertyCard";
import Container from "../../../../Design/Container/Container";
import MessagesOverview from "../../../Shared/Messages/MessagesOverview";

const Favourites = () => {
    const { isLoading, data: user, error } = useFetch("/favourites");
    const { t } = useTranslation();

    useTitle(t("navigation.favourites"));

    if (isLoading) {
        return <LoadingIndicator />;
    }
    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <Title type="medium">{t("users.messages.title")}</Title>
            <MessagesOverview />
            <Title type="medium">{t("users.favourites.title")}</Title>
            <Container type="cards-overview">
                {user &&
                    user.favourites.map((fav) => (
                        <PropertyCard key={fav.id} property={fav} />
                    ))}
            </Container>
        </>
    );
};

export default Favourites;
