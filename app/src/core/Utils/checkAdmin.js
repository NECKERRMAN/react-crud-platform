import { UserRoles } from "../modules/users/constants";

const checkAdmin = (user) => {
    return user.role === UserRoles.Admin;
};

export default checkAdmin;
