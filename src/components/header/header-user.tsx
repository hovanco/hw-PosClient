import { CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { Space, Avatar, Dropdown, Menu } from 'antd';
import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/state/auth-slide';
import { LogoutIcon } from '../../assets/icon';
import SettingAccounts from '../../features/settings/account';

const HeaderUser: FC = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.auth.loading);
    const user = useSelector((state: any) => state.auth.user);
    const storeName = useSelector((state: any) => state.store.store);

    const [visibleSettingAccount, setVisibleSettingAccount] = useState<boolean>(false);

    const toggleModalSettingAccount = () => setVisibleSettingAccount(!visibleSettingAccount);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (loading) return null;

    const overlay = (
        <Menu>
            {/* Show after add feature  */}
            {/* <Menu.Item key={1}>Chú thích phím tắt</Menu.Item> */}
            {/* <Menu.Item key={2}>Hướng dẫn sử dụng</Menu.Item> */}
            <Menu.Item key={3} onClick={toggleModalSettingAccount}>
                Cài đặt tài khoản
            </Menu.Item>
            <Menu.Item key={4} onClick={handleLogout} className='logout'>
                <LogoutIcon /> Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={overlay} trigger={['click']} placement='bottomRight'>
                <Space size={5} style={{ height: 56 }} >
                    <div className="content-user">
                        <div className="infor-user">
                            <span className="store-user">{storeName.name}</span>
                            <span className="name-user">{user.name}</span>
                        </div>
                        <Avatar icon={<UserOutlined />} size={43} src={user.picture} />
                    </div>
                </Space>
            </Dropdown>
            <SettingAccounts visible={visibleSettingAccount} toggle={toggleModalSettingAccount} />
        </>
    );
};

export default HeaderUser;
