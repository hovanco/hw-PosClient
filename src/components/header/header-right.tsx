import React, { FC } from 'react';
import { Space } from 'antd';

import Warehouse from '../../features/dashboard/components/warehouse';
import HeaderUser from './header-user';

const HeaderRight: FC = () => {
    return (
        <Space size={30}>
            <Warehouse />
            <HeaderUser />
        </Space>
    );
};

export default HeaderRight;
