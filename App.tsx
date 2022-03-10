import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme/theme';
import { 
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes/Routes';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/context/Auth';

export default function App() {
    const { isUserStorageLoading } = useAuth();
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if (!fontsLoaded || isUserStorageLoading ) {
        return <AppLoading />
    };

    return (
        <ThemeProvider theme={theme}>
            <StatusBar barStyle="light-content" />

            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ThemeProvider>
    );
};
