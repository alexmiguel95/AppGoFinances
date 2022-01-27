import { AxiosResponse } from 'axios';
import BalanceAccount from '../model/balance-account';
import { TransactionCardProps } from '../model/transaction-card';
import mock from './mock-api';
import balanceJson from './mocks/balance.json';
import historyTransactionJsn from './mocks/historyTransactions.json'

export const balanceAccountApi = () => {
    const getBalanceAccount = (): Promise<AxiosResponse<BalanceAccount>> => {
        return mock(balanceJson as BalanceAccount);
    };

    const getHistoryTransactions = (): Promise<AxiosResponse<TransactionCardProps[]>> => {
        return mock(historyTransactionJsn as TransactionCardProps[]);
    };

    return {
        getBalanceAccount,
        getHistoryTransactions
    };
};

export default balanceAccountApi();
