import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { get } from 'lodash';
import React, { FC } from 'react';
import { ProductAttribute } from '../../../../collections/product';
import formatMoney from '../../../../utils/formatMoney';
import { ProductState } from '../../pages/sales-counters/state/interface';
import ChangeCount from './change-count';
import ProductRemoveBtn from './product-remove-btn';

interface Props {
    products: ProductState[];
    isEdit?: boolean;
    style?: any;
}

const ProductOrder: FC<Props> = ({ products, isEdit = true, style = {} }) => {
    const base_columns: ColumnsType<ProductState> = [
        {
            title: 'Mã SP',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            width: 100,
            render: (code: string) => code || '---',
        },

        {
            title: 'Tên SP',
            dataIndex: '',
            render: (product) => {
                return (
                    <div>
                        {product.name}{' '}
                        {(get(product, 'attributes') || [])
                            .map((attr: ProductAttribute) => attr.tags)
                            .join(' - ')}
                    </div>
                );
            },
            align: 'center',
            key: 'product',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            align: 'center',
            key: 'price',
            render: (price) => `${formatMoney(price)} đ`,
        },

        {
            title: 'Số lượng',
            dataIndex: '',
            key: 'count',
            align: 'center',
            width: 200,
            render: (product) => {
                return <ChangeCount product={product} max={product.quantity} isEdit={isEdit} />;
            },
        },
        {
            title: 'Thành tiền',
            dataIndex: '',
            key: 'totalMoney',
            align: 'center',
            render: ({ count, price }) => {
                return `${formatMoney(count * price)} đ`;
            },
        },
    ];

    const columns: ColumnsType<ProductState> = isEdit
        ? [
              ...base_columns,
              {
                  title: '',
                  dataIndex: '',
                  key: 'remove',
                  width: 70,
                  render: (product) => {
                      return <ProductRemoveBtn product={product} />;
                  },
              },
          ]
        : base_columns;

    return (
        <Table
            sticky
            dataSource={products}
            columns={columns}
            rowKey={(item: ProductState) => item._id}
            pagination={false}
            style={style}
        />
    );
};

export default ProductOrder;
