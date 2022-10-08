import { createContext, useContext, useEffect, useState } from "react";

const KEY = "IMMODNC_AUTH";

const AuthContext = createContext();

const getAuthFromStorage = () => {
    const auth = localStorage.getItem(KEY);
    if (auth) {
        return JSON.parse(atob(auth));
    }
    return null;
};

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getAuthFromStorage());

    useEffect(() => {
        if (auth) {
            localStorage.setItem(KEY, btoa(JSON.stringify(auth)));
        } else {
            localStorage.removeItem(KEY);
        }
    }, [auth]);

    const handleLogout = () => {
        setAuth(null);
        localStorage.removeItem(KEY);
    };

    const handleLogin = (auth) => {
        setAuth(auth);
    };

    return (
        <AuthContext.Provider
            value={{ auth, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
