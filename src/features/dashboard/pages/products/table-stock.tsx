import React, { FC } from 'react';

import { ColumnsType } from 'antd/lib/table';
import formatMoney from '../../../../utils/formatMoney';
import { useProduct } from './use-product';
import { IWarehouse } from '../../../../collections/warehouse';
import { IStock } from '../../../../collections/product';

import { Card, Typography, Table } from 'antd';

interface IStockInTable extends Omit<IStock, 'warehouseId'> {
    warehouseId: IWarehouse | string;
}

const TableStock: FC = () => {
    const { getStocksByVariantId, product, loadingStocks } = useProduct();

    const columns: ColumnsType<IStockInTable> = [
        {
            title: 'Kho hàng',
            dataIndex: ['warehouseId', 'name'],
            key: 'warehouseId',
        },

        {
            title: 'Địa chỉ kho',
            dataIndex: '',
            key: 'address',
            render: (stock: IStockInTable) => getWarehouseAddress(stock.warehouseId),
        },

        {
            title: 'Tồn kho',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (quantity: number) => `${formatMoney(quantity)}`,
            width: 120,
        },
    ];

    const getWarehouseAddress = (warehouse: IWarehouse | string) => {
        if (typeof warehouse === 'string') return '';

        const { address, wardName, districtName, provinceName } = warehouse;
        return [address, wardName, districtName, provinceName].join(', ');
    };

    return (
        <Card className='card-table-stock'>
            <Typography.Title level={3}>Tình trạng tồn kho</Typography.Title>
            <Table
                sticky
                dataSource={getStocksByVariantId(product?._id)}
                columns={columns}
                rowKey='_id'
                pagination={false}
                className='table-dark-odd table-stock'
                loading={loadingStocks}
            />
        </Card>
    );
};

export default TableStock;
