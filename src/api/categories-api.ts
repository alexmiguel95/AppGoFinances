import { AxiosResponse } from 'axios';
import { ITypeCategory } from '../model/ITypeCategory';
import mock from './mock-api';
import categoriesJson from './mocks/categories.json';

export const balanceAccountApi = () => {
    const getGetogories = (): Promise<AxiosResponse<ITypeCategory[]>> => {
        return mock(categoriesJson);
    };

    return {
        getGetogories,
    };
};

export default balanceAccountApi();
