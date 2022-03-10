import { IDataUserWithGoogle, IDataUserWithApple }  from './../model/IDataUser';
import { AxiosError, AxiosResponse } from 'axios';
import socialLoginApi from '../api/social-login-api';
import { Alert } from 'react-native';
import i18n from '../i18n/i18n';

export const socialLoginService = () => {
    const signInWithGoogle = async (): Promise<IDataUserWithGoogle> => {
        try {
            const result: AxiosResponse<IDataUserWithGoogle> = await socialLoginApi.signInWithGoogle();

            if (result.status === 200 && result.data != null) {
                return Promise.resolve(result.data);
            }

            return Promise.reject({ status: result.status } as AxiosResponse);
        } catch (error) {
            const { response } = error as AxiosError;
            Alert.alert(i18n.t('messages.errors.notConnectGoogleAccount'));
            console.error(response);
            return Promise.reject(response);
        }
    };

    const signInWithApple = async (): Promise<IDataUserWithApple> => {
        try {
            const result: IDataUserWithApple = await socialLoginApi.signInWithApple();

            if (result != null) {
                return Promise.resolve(result);
            }

            return Promise.reject({ status: 401 } as AxiosResponse);
        } catch (error) {
            const { response } = error as AxiosError;
            Alert.alert(i18n.t('messages.errors.notConnectAppleAccount'));
            console.error(response);
            return Promise.reject(response);
        }
    };

    return {
        signInWithGoogle,
        signInWithApple,
    };
};

export default socialLoginService();