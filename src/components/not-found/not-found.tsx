import React, { FC } from 'react';
import { Result, Button } from 'antd';
import HeaderPage from '../../features/auth/pages/header-page';
import Image from '../../assets/icon/404.png';
import './style.less';

interface Props {
    showHeader?: boolean;
}

const NotFound: FC<Props> = ({ showHeader = true }) => {
    return (
        <div>
            {showHeader && <HeaderPage />}
            <Result
                className='not-found'
                icon={<img src={Image} alt='' className='not-found-image' />}
                extra={
                    <Button className='btn-back-homepage' type='primary' href='/'>
                        Trở về trang chủ
                    </Button>
                }
            />
        </div>
    );
};

export { NotFound };
