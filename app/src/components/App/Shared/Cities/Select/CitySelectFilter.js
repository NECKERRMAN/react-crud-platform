import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const CitySelectFilter = (props) => {
    const { data: cities } = useFetch("/cities");

    const options = cities
        ? cities.map((c) => ({
              value: c.name,
              label: `${c.zipcode} - ${c.name}`,
          }))
        : null;

    return <Select options={options} {...props} />;
};

export default CitySelectFilter;
