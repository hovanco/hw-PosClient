import { Col, Empty, Row } from 'antd';
import React, { FC } from 'react';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import BtnCancelOrder from './btn-cancel-order';
import ProductOrder from './product-order';

const ProductsSelect: FC = () => {
    const { products } = useSalesCounter();

    if (products.length === 0) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Chọn sản phẩm' />;
    }

    return (
        <>
            <div className='product-select-title'>
                <Row align='middle' justify='space-between' style={{ height: 47 }}>
                    <Col>
                        <div className='title-card-underline'>
                            <span>Đơn hàng</span>
                        </div>
                    </Col>
                    <Col>
                        <BtnCancelOrder />
                    </Col>
                </Row>
            </div>

            <ProductOrder products={products} style={{ marginBottom: 100 }} />
        </>
    );
};

export default ProductsSelect;
