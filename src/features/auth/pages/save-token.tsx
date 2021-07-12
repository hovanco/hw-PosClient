import { message } from 'antd';
import * as queryString from 'query-string';
import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IToken, setToken } from '../../../api/token';
import { Loading } from '../../../components';
import useHiddenModalExpired from '../../../hook/use-hidden-modal-expired';
import { BaseLayout } from '../../../layout';
import { loadUser } from '../state/auth-slide';

interface Props {}

const SaveToken: FC<Props> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { removeValueHidden } = useHiddenModalExpired();

    const searchState: {
        token?: string;
        remember?: string;
        location?: string;
    } = queryString.parse(history.location.search);

    const saveAndLoadUser = async (): Promise<void> => {
        const { token, remember, location } = searchState;

        if (!token || !location) {
            return;
        }
        const rememberValue = remember === 'true';
        const tokenValue: IToken = JSON.parse(token);
        const locationValue: Location = JSON.parse(location);

        await setToken({ token: tokenValue, remember: rememberValue });
        await dispatch(loadUser());
        message.success('Đăng nhập thành công');
        removeValueHidden();

        if (locationValue.pathname.includes('/auth')) {
            history.replace('/dashboard/sales-counters');
            return;
        }

        history.replace(locationValue);
    };

    useEffect(() => {
        saveAndLoadUser();
    }, []);

    return (
        <BaseLayout title='Insa Pos'>
            <Loading full />
        </BaseLayout>
    );
};

export default SaveToken;
