import { ensureUser } from "@/api/users"
import type { User } from "@/types/user"
import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { createContext, useContext, useState, type ReactNode } from "react"

interface UserCredentials {
    name: string;
    tagLine: string;
}

interface UserContextType {
    userQuery: UseQueryResult<User, Error>;
    user: User | undefined;
    login: (creds: UserCredentials) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [creds, setCreds] = useState<UserCredentials | null>(() => {
        const saved = localStorage.getItem("lol_user_session")
        return saved ? JSON.parse(saved) : null
    });


    const userQuery = useQuery({
        queryKey: ['user', creds?.name, creds?.tagLine],
        queryFn: () => ensureUser(creds!.name, creds!.tagLine),
        enabled: !!creds,
    });

    const login = (userData: UserCredentials) => {
        localStorage.setItem("lol_user_session", JSON.stringify(userData));
        setCreds(userData);
    };
    const logout = () => {
        localStorage.removeItem("lol_user_session");
        setCreds(null);
    };

    const value = {
        userQuery,
        user: userQuery.data,
        login,
        logout,
        isAuthenticated: !!creds && !!userQuery.data
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};