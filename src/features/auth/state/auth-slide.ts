import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../../api/auth-api';
import { removeToken, getToken } from '../../../api/token';

export interface IAuth {
    loading: boolean;
    isAuth: boolean;
    isLogout: boolean;
    user: any;
}

const authSlide = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuth: false,
        isLogout: false,
        user: null,
    },
    reducers: {
        loadUserStart(state) {
            state.loading = true;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.isAuth = true;
            state.isLogout = false;
        },
        loadUserFailed(state) {
            removeToken();

            state.loading = false;
            state.user = null;
            state.isAuth = false;
        },
        logoutAction(state, action) {
            removeToken();

            state.loading = false;
            state.user = null;
            state.isAuth = false;
            state.isLogout = action.payload;
        },
        updateUserSuccess(state, action) {
            state.user = action.payload;
        },
    },
});

const { actions, reducer } = authSlide;

export const { loadUserStart, loadUserSuccess, loadUserFailed, logoutAction, updateUserSuccess } =
    actions;

export const loadUser = () => async (dispatch: any) => {
    try {
        dispatch(loadUserStart());

        const response = await authApi.getUser();

        return dispatch(loadUserSuccess(response));
    } catch (err) {
        dispatch(loadUserFailed());
    }
};

export const logout = (value?: boolean) => async (dispatch: any) => {
    try {
        const refreshToken = getToken('refreshToken');

        if (refreshToken) {
            await authApi.logout(refreshToken);
        }
    } catch (error) {
    } finally {
        removeToken();

        dispatch(logoutAction(typeof value === 'boolean' ? value : true));
    }
};

export default reducer;
