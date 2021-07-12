import React, { FC } from 'react';
import { Space } from 'antd';
import Logo from '../logo';
import Menu from '../menu';

const HeaderLeft: FC = () => {
    return (
        <Space size={100} align='center' style={{ marginTop: 4 }}>
            <Logo />
            <Menu />
        </Space>
    );
};

export default HeaderLeft;
