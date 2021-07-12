import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { BaseLayout } from '../../../../layout';
import { OrdersList, SearchOrder } from '../../components';
import Order from '../../components/order';
import { ProvicerOrderContext } from './state';

interface Props {}

const title = 'Quản lý đơn hàng';

const OrderPage: FC<Props> = () => {
    return (
        <ProvicerOrderContext>
            <BaseLayout title={title}>
                <Row gutter={15} style={{ height: `calc(100vh - 90px)` }}>
                    <Col span={10}>
                        <div
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <SearchOrder />

                            <div style={{ flex: 1, marginTop: 15 }}>
                                <OrdersList />
                            </div>
                        </div>
                    </Col>
                    <Col span={14}>
                        <Order />
                    </Col>
                </Row>
            </BaseLayout>
        </ProvicerOrderContext>
    );
};

export default OrderPage;
