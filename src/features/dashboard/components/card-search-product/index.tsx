import { Card } from 'antd';
import React from 'react';
import { Product } from '../../../../collections/product';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { OrderDraftTabs } from '../order-draft-tabs';
import SearchProduct from '../search-product';

const CardSearchProduct = () => {
    const { addProduct } = useSalesCounter();

    const selectProduct = (product: Product) => {
        addProduct({ ...product, count: 1 });
    };

    return (
        <Card className='card-shadow' bodyStyle={{ padding: '16px 24px', background: '#f6f8f8' }}>
            <div style={{ overflow: 'hidden', marginBottom: 12 }}>
                <div className='title-card' style={{ float: 'left' }}>
                    <span>Bán hàng</span>
                </div>
                <div style={{ marginLeft: 110 }}>
                    <OrderDraftTabs />
                </div>
            </div>

            <SearchProduct selectProduct={selectProduct} />
        </Card>
    );
};

export default CardSearchProduct;
