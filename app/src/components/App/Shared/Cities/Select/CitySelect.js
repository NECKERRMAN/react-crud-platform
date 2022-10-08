import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const CitySelect = (props) => {
    const { data: cities } = useFetch("/cities");

    const options = cities
        ? cities.map((c) => ({
              value: c.id,
              label: `${c.zipcode} - ${c.name}`,
          }))
        : null;

    return <Select options={options} {...props} />;
};

export default CitySelect;
