import { AxiosResponse } from 'axios';
import BalanceAccount from '../model/balance-account';
import mock from './mock-api';
import balanceJson from './mocks/balance.json';

export const balanceAccountApi = () => {
    const getBalanceAccount = (): Promise<AxiosResponse<BalanceAccount>> => {
        return mock(balanceJson as BalanceAccount);
    };

    return {
        getBalanceAccount,
    };
};

export default balanceAccountApi();
