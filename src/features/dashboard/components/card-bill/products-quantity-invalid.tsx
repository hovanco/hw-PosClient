import { Button, Col, Row, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { concat, pick } from 'lodash';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStock } from '../../../../api/stock-api';
import { ProductAttribute } from '../../../../collections/product';
import { useSalesCounter } from '../../pages/sales-counters/state/context';

interface Props {
    onCancel: () => void;
}

const useProductQuantity = (productIds: any[]) => {
    const store = useSelector((state: any) => state.store.store);
    const [loading, setLoading] = useState<boolean>(true);
    const [productsInvalid, setProductInvalid] = useState<any[]>([]);

    useEffect(() => {
        async function getProducstStock(storeId: string) {
            setLoading(true);

            const data = await Promise.all(
                productIds.map(async (item: any) => {
                    const response = await getStock({
                        storeId,
                        productId: item._id,
                        parentId: item.parentId,
                    });

                    return response.data;
                })
            );

            let productsInvalidArray: any[] = [];

            concat([], ...data).forEach((item) => {
                if (item.quantity === 0) {
                    productsInvalidArray.push(item);
                } else {
                    const productOrder = productIds.find((i) => i._id === item._id);
                    if (productOrder && productOrder.count > item.quantity) {
                        productsInvalidArray.push(item);
                    }
                }
            });

            setProductInvalid(productsInvalidArray);
            setLoading(false);
        }

        if (store._id) {
            getProducstStock(store._id);
        }
    }, [store._id]);

    const value = useMemo(() => ({ loading, productsInvalid }), [loading, productsInvalid]);

    return value;
};

const columns: ColumnsType<any> = [
    {
        title: 'Tên sản phẩm',
        key: 'name',
        dataIndex: 'productId',
        align: 'center',
        render: (product) => {
            const variant: string = product.attributes
                ?.map((attr: ProductAttribute) => attr.tags)
                ?.join(' - ');

            return (
                <Row style={{ textAlign: 'center' }}>
                    <Col span={24}>{product.name}</Col>
                    <Col span={24}>{variant.trim().length > 0 && <Tag>variant</Tag>}</Col>
                </Row>
            );
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'quantity',
        align: 'center',
        key: 'quantity',
        render: (quantity) => {
            if (quantity === 0) return 'đã hết hàng';
            return `chỉ còn ${quantity} sản phẩm`;
        },
    },
];

const ProductQuantityInvalid: FC<Props> = ({ onCancel }) => {
    const { products } = useSalesCounter();
    const { loading, productsInvalid } = useProductQuantity(
        products.map((i: any) => pick(i, ['_id', 'parentId', 'count']))
    );

    useEffect(() => {}, [productsInvalid]);

    return (
        <>
            <div style={{ margin: '-25px -24px 0 -24px' }}>
                <Table
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={productsInvalid}
                    rowKey='_id'
                    pagination={false}
                />
            </div>

            <Row justify='end' style={{ marginTop: 20 }}>
                <Col>
                    <Button type='primary' danger onClick={onCancel}>
                        Đóng
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default ProductQuantityInvalid;
