import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PublicRoutes from './Public.routes';
import PrivateRoutes from './Private.routes';
import { useAuth } from '../context/Auth';

const Routes = () => {
    const { user } = useAuth();
   
    return (
        <NavigationContainer>
            {user.id != null ? <PrivateRoutes /> : <PublicRoutes />}
        </NavigationContainer>
    );
};

export default Routes;