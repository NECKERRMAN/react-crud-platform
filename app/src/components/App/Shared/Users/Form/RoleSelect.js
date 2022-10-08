import Select from "../../../../Design/Form/Select";

const UserSelect = (props) => {
    const userRoles = [
        { key: "Admin", type: "ADMIN" },
        { key: "Realtor", type: "REALTOR" },
        { key: "User", type: "USER" },
    ];

    const options = userRoles
        ? userRoles.map((c) => ({ value: c.type, label: c.key }))
        : null;

    return <Select options={options} {...props} />;
};

export default UserSelect;
