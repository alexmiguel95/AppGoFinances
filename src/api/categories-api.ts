import { AxiosResponse } from 'axios';
import TypeCategory from '../model/type-category';
import mock from './mock-api';
import categoriesJson from './mocks/categories.json';

export const balanceAccountApi = () => {
    const getGetogories = (): Promise<AxiosResponse<TypeCategory[]>> => {
        return mock(categoriesJson);
    };

    return {
        getGetogories,
    };
};

export default balanceAccountApi();
