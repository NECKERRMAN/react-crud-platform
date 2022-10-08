import useRealtor from "../../../../core/hooks/useRealtor";

const RealtorContainer = ({ children }) => {
    const realtor = useRealtor();

    if (!realtor) {
        return null;
    }

    return <>{children}</>;
};

export default RealtorContainer;
