import { AxiosResponse } from 'axios';

const mock = <T>(payload: T) => {
    return new Promise<AxiosResponse<T>>(resolve =>
        setTimeout(() => {
            resolve({
                data: payload,
                status: 200,
                statusText: 'Success',
                headers: {},
                config: {},
            });
        }, 2000)
    );
};

export default mock;
