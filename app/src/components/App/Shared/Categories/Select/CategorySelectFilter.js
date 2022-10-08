import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const CategorySelectFilter = (props) => {
    const { data: categories } = useFetch("/categories");

    const options = categories
        ? categories.map((c) => ({
              value: c.name,
              label: c.key,
          }))
        : null;

    return <Select options={options} {...props} />;
};

export default CategorySelectFilter;
