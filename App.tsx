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
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { StatusBar } from 'react-native';

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />
    };

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                <StatusBar barStyle="light-content" />
                <Routes />
            </NavigationContainer>
        </ThemeProvider>
    );
};
