const UserRoles = {
    Admin: "ADMIN",
    User: "USER",
    Realtor: "REALTOR",
};

const checkRealtor = (user) => {
    return user.role === UserRoles.Realtor;
};

export default checkRealtor;
