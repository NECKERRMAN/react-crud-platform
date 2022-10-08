import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `DNC | ${title}`;
    }, [title]);
};

export default useTitle;
