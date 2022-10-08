import Select from "../../../../Design/Form/Select";

const PropertySelect = (props) => {
    const propertyTypes = [
        { key: "Appartment", type: "APPARTMENT" },
        { key: "Farm", type: "FARM" },
        { key: "House", type: "HOUSE" },
        { key: "Penthouse", type: "PENTHOUSE" },
        { key: "Terraced House", type: "TERRACED HOUSE" },
        { key: "Villa", type: "VILLA" },
    ];

    const options = propertyTypes
        ? propertyTypes.map((c) => ({ value: c.type, label: c.key }))
        : null;

    return <Select options={options} {...props} />;
};

export default PropertySelect;
