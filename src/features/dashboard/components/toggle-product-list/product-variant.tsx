import { Table, Tag } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStock } from '../../../../api/stock-api';
import { IProduct } from '../../../../collections/product';
import { IWarehouse } from '../../../../collections/warehouse';
import { Loading, TextEllipsis } from '../../../../components';

interface Props {
    product: IProduct;
}

const useStock = ({ productId, parentId }: { productId?: string; parentId?: string }) => {
    const store = useSelector((state: any) => state.store.store);
    const [loading, setLoading] = useState(true);
    const [stocks, setStocks] = useState<any[]>([]);

    useEffect(() => {
        async function loadStocks() {
            try {
                setLoading(true);
                const response = await getStock({
                    storeId: store._id,
                    parentId,
                    productId,
                });
                setStocks(response.data);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
        if (store._id) {
            loadStocks();
        }
        return () => {};
    }, []);

    const value = useMemo(() => ({ loading, stocks }), [loading, stocks]);
    return value;
};

const ProductVariant: FC<Props> = ({ product }) => {
    const isBlank = !product?.variants || product?.variants.length === 0;
    const params = isBlank ? { productId: product._id } : { parentId: product._id };

    const { loading, stocks } = useStock(params);
    const warehouses = useSelector((state: any) => state.store.warehouses);

    const renderVariants = () => {
        let columns: any = warehouses.map((item: IWarehouse, idx: number) => {
            return {
                title: <TextEllipsis width='100%'>{item.name}</TextEllipsis>,
                dataIndex: '',
                align: 'center',
                key: item._id,
                width: 150,
                render: (record: any) => <span>{record[item?._id as string] || 0}</span>,
            };
        });

        if (!isBlank) {
            columns.unshift({
                title: '',
                dataIndex: 'productId',
                width: 150,
                align: 'center',
                key: 'name',
                fixed: 'left',
                render: (productId: any) => (
                    <Tag>{productId.attributes.map((item: any) => item.tags[0]).join(' - ')}</Tag>
                ),
            });
        }

        const getDataSource = () => {
            if (!product.variants || product.variants?.length === 0) {
                let localStock = {
                    _id: product._id,
                    productId: product,
                };

                if (stocks.length > 0) {
                    let stockFilteredByProductId = stocks.filter(
                        (item: any) => item.productId._id === product._id
                    );

                    localStock = stockFilteredByProductId.reduce(
                        (prevValue, currValue: any) => ({
                            ...prevValue,
                            [currValue.warehouseId]: currValue.quantity,
                        }),
                        localStock
                    );
                }

                return [localStock];
            }

            let newLocalStocks = (product.variants as any[]).map((variant: any) => {
                let localStock = {
                    _id: variant._id,
                    productId: variant,
                };

                if (stocks.length > 0) {
                    let stockFilteredByProductId = stocks.filter(
                        (item: any) => item.productId._id === variant._id
                    );

                    localStock = stockFilteredByProductId.reduce(
                        (prevValue, currValue: any) => ({
                            ...prevValue,
                            [currValue.warehouseId]: currValue.quantity,
                        }),
                        localStock
                    );
                }

                return localStock;
            });

            return newLocalStocks;
        };

        return (
            <Table
                columns={columns}
                dataSource={getDataSource()}
                loading={loading}
                pagination={false}
                rowKey='_id'
                bordered
                scroll={{ x: 600, y: 300 }}
            />
        );
    };

    return <div className='variants'>{renderVariants()}</div>;
};

export default ProductVariant;
