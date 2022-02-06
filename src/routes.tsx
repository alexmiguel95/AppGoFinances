import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from './i18n/i18n';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

const Routes = () => {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                },
            }}
        >
            <Screen
                name={i18n.t('menu.listing')}
                component={Dashboard}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialIcons name="format-list-bulleted" size={size} color={color} />,
                }}
            />
            <Screen
                name={i18n.t('menu.register')}
                component={Register}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialIcons name="attach-money" size={size} color={color} />,
                }}
            />
            <Screen
                name={i18n.t('menu.sumary')}
                component={Register}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialIcons name="pie-chart" size={size} color={color} />,
                }}
            />
        </Navigator>
    );
};

export default Routes;
