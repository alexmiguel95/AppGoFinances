import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IUser {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isUserStorageLoading: boolean;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isUserStorageLoading, setIsUserStorageLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUserStorageDate = async () => {
            const userStoraged = await AsyncStorage.getItem('@gofinances:user');

            if (userStoraged != null) {
                const userLogged = JSON.parse(userStoraged);
                setUser(userLogged);
            }

            setIsUserStorageLoading(false);
        };

        loadUserStorageDate();
    }, []);

    return <AuthContext.Provider value={{ user, setUser, isUserStorageLoading }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
