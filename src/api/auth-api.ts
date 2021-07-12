import Axios from 'axios';
import constants from '../constants';
import axios from './axios-client';

async function getUser(): Promise<any> {
    const url = '/authentication/v1/users/info';

    const response = await axios({
        url,
        method: 'GET',
    });

    return response;
}

async function loginWithEmail(data: { email: string; password: string }): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/signin',
        data,
    });

    return response;
}

async function updateUserInfo(data: { name?: string; picture?: string }): Promise<any> {
    const response = await axios({
        method: 'PUT',
        url: `/authentication/v1/users/info`,
        data,
    });

    return response;
}

async function changePassword(data: {
    currentPassword: string;
    newPassword: string;
}): Promise<any> {
    const response = await axios({
        method: 'PUT',
        url: `/authentication/v1/users/changePassword`,
        data,
    });

    return response;
}

export async function refreshAccessToken(refreshToken: string): Promise<any> {
    const response = await Axios({
        method: 'POST',
        url: `${constants.URL_API}/authentication/v1/auth/refresh-token`,
        data: {
            refreshToken,
        },
    });

    return response.data;
}

export async function existingRefreshToken(refreshToken: string): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/auth/existing-refresh-token',
        data: {
            refreshToken,
        },
    });

    return response;
}

export async function logout(refreshToken: string): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/auth/logout',
        data: {
            refreshToken,
        },
    });

    return response.data;
}

const authApi = {
    getUser,
    loginWithEmail,
    updateUserInfo,
    changePassword,
    refreshAccessToken,
    existingRefreshToken,
    logout,
};

export default authApi;
