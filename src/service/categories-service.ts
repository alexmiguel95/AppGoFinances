import { AxiosError, AxiosResponse } from 'axios';
import categoriesApi from '../api/categories-api';
import { ITypeCategory } from '../model/ITypeCategory';

export const categoriesService = () => {
    const getCategories = async (): Promise<ITypeCategory[]> => {
        try {
            const result: AxiosResponse<ITypeCategory[]> = await categoriesApi.getGetogories();
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
        getCategories,
    };
};

export default categoriesService();
