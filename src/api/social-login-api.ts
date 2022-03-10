import { IDataUserWithGoogle, IDataUserWithApple } from './../model/IDataUser';
import axios, { AxiosResponse } from 'axios';
import { CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

interface IAuthorizationResponse {
    params: { access_token: string };
}

export const socialLoginApi = () => {
    const signInWithGoogle = async (): Promise<AxiosResponse<IDataUserWithGoogle>> => {
        const responseType = 'token';
        const scope = encodeURI('profile email');
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${responseType}&scope=${scope}`;

        const response = await AuthSession.startAsync({ authUrl }) as unknown as IAuthorizationResponse;
    
        return axios.get<IDataUserWithGoogle>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.params.access_token}`);
    };

    const signInWithApple = async (): Promise<IDataUserWithApple> => {
        const response = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        }) as unknown as IDataUserWithApple;;
    
        return response;
    };

    return {
        signInWithGoogle,
        signInWithApple
    };
};

export default socialLoginApi();