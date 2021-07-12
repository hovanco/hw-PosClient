import React, { FC } from 'react';

import { ProductProvider } from './context';

import { Row, Col, Space } from 'antd';
import SearchProduct from './search-product';
import ProductList from './product-list';
import TableStock from './table-stock';
import ProductGeneralInfo from './product-general-info';
import { BaseLayout } from '../../../../layout';

import './style.less';

const title = 'Sản phẩm';

const Products: FC = () => {
    return (
        <ProductProvider>
            <BaseLayout title={title}>
                <Row
                    className='product-research'
                    gutter={18}
                    style={{ height: `calc(100vh - 90px)` }}
                >
                    <Col span={8}>
                        <div
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <SearchProduct />

                            <div style={{ flex: 1, marginTop: 15 }}>
                                <ProductList />
                            </div>
                        </div>
                    </Col>
                    <Col span={16} flex={1}>
                        <Space size={18} direction='vertical'>
                            <ProductGeneralInfo />
                            <TableStock />
                        </Space>
                    </Col>
                </Row>
            </BaseLayout>
        </ProductProvider>
    );
};

export default Products;
