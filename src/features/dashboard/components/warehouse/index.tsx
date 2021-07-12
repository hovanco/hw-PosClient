import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../../collections/store';
import { IWarehouse } from '../../../../collections/warehouse';
import { selectWarehouse, loadWarehouse } from '../../state/store-slide';

const Warehouse: FC = () => {
    const dispatch = useDispatch();
    const store: IStore = useSelector((state: any) => state.store.store);
    const warehouseId: string = useSelector((state: any) => state.store.warehouseId);
    const loading: string = useSelector((state: any) => state.store.loadingWarehouse);
    const warehouses: IWarehouse[] = useSelector((state: any) => state.store.warehouses);

    useEffect(() => {
        if (store) {
            dispatch(selectWarehouse(store.warehouseId));
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (store) {
            dispatch(loadWarehouse());
        }

        // eslint-disable-next-line
    }, [store]);

    if (loading) return null;

    const warehouse_exist: IWarehouse | undefined = warehouses.find(
        (warehouse: any) => warehouse._id === warehouseId
    );

    const handleSelectWarehouse = (id: string) => {
        dispatch(selectWarehouse(id));
    };

    const menu = (
        <Menu>
            {warehouses.map((warehouse: IWarehouse) => (
                <Menu.Item
                    key={warehouse._id}
                    disabled={warehouse_exist && warehouse._id === warehouse_exist._id}
                    onClick={() => handleSelectWarehouse(warehouse._id)}
                >
                    {warehouse.name}
                </Menu.Item>
            ))}
        </Menu>
    );

    const title = warehouse_exist ? warehouse_exist.name : 'Chọn chi nhánh';

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button type='primary'>
                {title} <CaretDownOutlined />
            </Button>
        </Dropdown>
    );
};

export default Warehouse;
