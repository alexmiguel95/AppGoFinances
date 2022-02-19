import { AxiosError, AxiosResponse } from 'axios';
import balanceAccountApi from '../api/balance-account-api';
import BalanceAccount from '../model/IBalanceAccount';

export const balanceAccountService = () => {
    const getBalanceAccount = async (): Promise<BalanceAccount> => {
        try {
            const result: AxiosResponse<BalanceAccount> = await balanceAccountApi.getBalanceAccount();
            if (result.status === 200 && result.data != null) {
                return Promise.resolve(result.data);
            }

            return Promise.reject({ status: result.status } as AxiosResponse);
        } catch (error) {
            const { response } = error as AxiosError;

            console.error(response);
            return Promise.reject(response);
        }
    };

    return {
        getBalanceAccount,
    };
};

export default balanceAccountService();
