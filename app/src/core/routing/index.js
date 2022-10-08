const AuthRoutes = {
    Index: "/auth",
    Login: "/auth/login",
    Register: "/auth/register",
};

const AdminRoutes = {
    Index: "/admin",
    Dashboard: "/admin/dashboard",
    NewProperty: "/admin/new-property",
    AllProperties: "/admin/properties",
    AllCategories: "/admin/categories",
    Offices: "/admin/offices",
    NewOffice: "/admin/new-office",
    Realtors: "/admin/realtors",
    EditRealtor: "/admin/edit-realtor/:id",
    Users: "/admin/users",
    EditUser: "/admin/edit-user/:id",
    EditProperty: "/admin/edit-property/:id",
};

const RealtorRoutes = {
    Index: "/realtor",
    Dashboard: "/realtor/dashboard",
    Office: "/realtor/office",
    Edit: "/realtor/edit/:id",
    New: "/realtor/new-property",
};

const UserRoutes = {
    Index: "/",
    Account: "/account",
    Favourites: "/favourites",
};

const PropertiesRoutes = {
    Index: "/",
    Filter: "/filter/:id",
    ForSale: "/for-sale",
    ForRent: "/for-rent",
    Detail: "/property/:id",
};

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach((key) => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export { AuthRoutes, UserRoutes, PropertiesRoutes, AdminRoutes, RealtorRoutes };
