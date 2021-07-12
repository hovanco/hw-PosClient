import axios from 'axios';
import queryString from 'query-string';
import authApi from '../api/auth-api';
import constants from '../constants';
import { checkToken, getToken, getTokenLocal, IToken, removeToken, setToken } from './token';

let isRefreshed = false;

const axiosClient = axios.create({
    baseURL: constants.URL_API,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    const accessToken = getToken('accessToken');

    if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !isRefreshed) {
            isRefreshed = true;

            const refreshToken = getToken('refreshToken');

            if (refreshToken) {
                const isValidRefreshToken = checkToken(refreshToken);

                if (!isValidRefreshToken) {
                    removeToken();
                    return Promise.reject(error);
                }

                try {
                    const response = await authApi.refreshAccessToken(refreshToken);
                    const { accessToken } = response;

                    const tokenLocal = getTokenLocal();

                    setToken({
                        token: {
                            ...(tokenLocal as IToken),
                            accessToken,
                        },
                        remember: true,
                    });

                    originalRequest._retry = true;

                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                    return axiosClient(originalRequest);
                } catch (err) {
                    if (err.response.status === 401) {
                        if (refreshToken) {
                            await authApi.logout(refreshToken);
                        }

                        removeToken();
                    }

                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
