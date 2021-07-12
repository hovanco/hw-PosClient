import React, { FC } from 'react';
import './menu.less';
import { NavLink, useRouteMatch } from 'react-router-dom';

interface IMenu {
    title: string;
    to: string;
}

const menus: IMenu[] = [
    {
        title: 'Bán hàng tại quầy',
        to: '/sales-counters',
    },
    {
        title: 'Tra cứu đơn hàng',
        to: '/orders',
    },
    {
        title: 'Tra cứu sản phẩm',
        to: '/products',
    },
];

interface MenuItemProps {
    menu: IMenu;
}

const MenuItem: FC<MenuItemProps> = ({ menu }) => {
    const match = useRouteMatch();

    const to = `${match.path}${menu.to}`;

    return (
        <div className='menu-item'>
            <NavLink activeClassName='active' to={to}>
                {menu.title}
            </NavLink>
        </div>
    );
};

const Menu: FC = () => {
    return (
        <div className='menu'>
            {menus.map((menu) => (
                <MenuItem menu={menu} key={menu.to} />
            ))}
        </div>
    );
};

export default Menu;
