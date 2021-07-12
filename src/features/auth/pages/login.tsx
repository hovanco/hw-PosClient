import * as queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../../components';
import constants from '../../../constants';
import { BaseLayout } from '../../../layout';

interface Props {}

const Login = (props: Props) => {
    const location = useLocation();
    const isLogout = useSelector((state: any) => state.auth.isLogout);

    useEffect(() => {
        const lastState: any = location.state;
        let lastLocation = lastState?.from;
        if (!lastLocation?.pathname) {
            lastLocation = {
                pathname: '/dashboard/sales-counters',
            };
        }
        const search = queryString.stringify({
            url: `${window.location.origin}/auth/save-token`,
            location: JSON.stringify(lastLocation),
            isLogout,
            saleChannel: 'pos',
        });
        window.location.href = `${constants.URL_AUTH}login?${search}`;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BaseLayout title='Login'>
            <Loading full />
        </BaseLayout>
    );
};

export default Login;
