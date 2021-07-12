import { Button, Dropdown, Menu } from 'antd';
import React, { FC, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ICategory } from '../../../../collections/category';
import { DownIcon } from '../../assets/icon';

interface Props {
    onSelect: (categoryId: string) => void;
    categoryId?: string;
}

const CategorySelect: FC<Props> = memo(({ onSelect, categoryId }) => {
    const categories = useSelector((state: any) => state.store.categories);

    const handleClick = (e: any) => {
        onSelect(e.key);
    };

    const selectKeys = categoryId ? [categoryId] : [];

    const menu = (
        <Menu
            onClick={handleClick}
            selectedKeys={selectKeys}
            style={{ height: 200, overflowY: 'auto' }}
        >
            {categories.map((category: ICategory) => {
                return <Menu.Item key={category._id}>{category.name}</Menu.Item>;
            })}
        </Menu>
    );

    const category = useMemo(
        () => categories.find((category: ICategory) => category._id === categoryId),
        [categories, categoryId]
    );

    const label = category ? category.name : `Loại sản phẩm`;

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button type='text'>
                {label} <DownIcon />
            </Button>
        </Dropdown>
    );
});

export { CategorySelect };
