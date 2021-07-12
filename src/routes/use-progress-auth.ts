import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../api/auth-api';
import { getToken } from '../api/token';
import { loadUser, logout } from '../features/auth/state/auth-slide';

export function useProgressAuth() {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.auth.loading);
    const [progress, setProgress] = useState<boolean>(true);

    useEffect(() => {
        async function processAuth() {
            const refreshToken = getToken('refreshToken');

            if (window.location.pathname === '/save-token' || !refreshToken) {
                setProgress(false);
                return;
            }


            try {
                const response = await authApi.existingRefreshToken(refreshToken);

                if (!response.existingRefreshToken) {
                    dispatch(logout(false));
                    return;
                }

                dispatch(loadUser());
            } catch (error) {
                dispatch(logout());
            } finally {
                setProgress(false);
            }
        }

        processAuth();
    }, []);

    return useMemo(() => ({ loading, progress }), [loading, progress]);
}
