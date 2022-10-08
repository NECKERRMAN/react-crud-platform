import Select from "../../../../Design/Form/Select";

const StatusSelect = (props) => {
    const statusTypes = [
        { key: "Sold", type: "SOLD" },
        { key: "For Sale", type: "FOR SALE" },
        { key: "Rented", type: "RENTED" },
        { key: "For Rent", type: "FOR RENT" },
    ];

    const options = statusTypes
        ? statusTypes.map((c) => ({ value: c.type, label: c.key }))
        : null;

    return <Select options={options} {...props} />;
};

export default StatusSelect;
