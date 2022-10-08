import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const OfficeSelect = (props) => {
    const { data: offices } = useFetch("/realtor/offices");

    const options = offices
        ? offices.map((office) => ({ value: office.id, label: office.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default OfficeSelect;
