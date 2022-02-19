import { AxiosError, AxiosResponse } from 'axios';
import categoriesApi from '../api/categories-api';
import { TypeCategory } from '../model/type-category';

export const categoriesService = () => {
    const getCategories = async (): Promise<TypeCategory[]> => {
        try {
            const result: AxiosResponse<TypeCategory[]> = await categoriesApi.getGetogories();
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
