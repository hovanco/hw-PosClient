import { FormOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row, Space } from 'antd';
import { get, pick } from 'lodash';
import React, { FC } from 'react';
import { IOrder, IOrderBill } from '../../../../collections/order';
import { ItemRow } from '../../../../components';
import formatMoney from '../../../../utils/formatMoney';
import { useOrders } from '../../pages/order/state';
import { getFeeForCustomer } from '../../ultils/order';
import ProductOrder from '../products-select/product-order';
import { Cirle, NoOrder, OrderPrint, OrderStatus } from './components';
import './order.less';

interface Props {}

const colsLayout = {
    colLabel: 12,
    colChildren: 11,
};

const Order: FC<Props> = () => {
    const { order } = useOrders();

    const feeForCustomer = order ? getFeeForCustomer(order) : 0;

    const orderPrint: IOrderBill = {
        ...(order as IOrder),
        valuePayment: feeForCustomer,
    };

    const renderContent = () => {
        if (!order) return <NoOrder />;

        return (
            <>
                <Space size={15} direction='vertical' style={{ width: '100%' }}>
                    <Row justify='space-between' align='middle'>
                        <Col>
                            <Space>
                                <span className='order-code'>{order.code}</span>
                                <OrderStatus status={order.status} />
                            </Space>
                        </Col>
                        <Col>
                            <OrderPrint order={orderPrint} />
                        </Col>
                    </Row>
                    <div>
                        <div className='title-card-underline' style={{ marginBottom: 15 }}>
                            <span>Thông tin đơn hàng</span>
                        </div>
                        <div>
                            <Row gutter={20}>
                                <Col span={12}>
                                    <ItemRow
                                        icon={
                                            <Cirle>
                                                <UserOutlined />
                                            </Cirle>
                                        }
                                        label='Tên khách hàng'
                                        {...colsLayout}
                                    >
                                        {order.customer.name || '---'}
                                    </ItemRow>
                                    <ItemRow
                                        label='Số điện thoại'
                                        icon={
                                            <Cirle>
                                                <PhoneOutlined />
                                            </Cirle>
                                        }
                                        {...colsLayout}
                                    >
                                        {order.customer.phoneNo || '---'}
                                    </ItemRow>
                                </Col>
                                <Col span={12}>
                                    {/* <ItemRow
                                        icon={
                                            <Cirle>
                                                <GiftOutlined />
                                            </Cirle>
                                        }
                                        label='Khuyến mãi'
                                        {...colsLayout}
                                    >
                                        ---
                                    </ItemRow> */}
                                    <ItemRow
                                        icon={
                                            <Cirle>
                                                <FormOutlined />
                                            </Cirle>
                                        }
                                        label='Ghi chú'
                                        {...colsLayout}
                                    >
                                        {get(order, 'deliveryOptions.customerNote') || '---'}
                                    </ItemRow>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div>
                        <div className='title-card-underline' style={{ marginBottom: 15 }}>
                            <span>Thông tin sản phẩm</span>
                        </div>

                        <div style={{ marginLeft: -24, marginRight: -24 }}>
                            <ProductOrder
                                products={order.products.map((product: any) => ({
                                    ...product.productId,
                                    ...pick(product, ['count', 'price']),
                                }))}
                                isEdit={false}
                                style={{ marginBottom: 30 }}
                            />
                        </div>

                        <div style={{ float: 'right', width: 300 }}>
                            <ItemRow label='Tổng số sản phẩm' colLabel={12} colChildren={11}>
                                {order.products.length}
                            </ItemRow>
                            <ItemRow label='Tổng giá trị' colLabel={12} colChildren={11}>
                                {formatMoney(order.totalPrice)} đ
                            </ItemRow>
                            {/* <ItemRow label='Khuyến mãi' colLabel={12} colChildren={11}>
                                ---
                            </ItemRow> */}
                            <ItemRow label='Phí khác' colLabel={12} colChildren={11}>
                                ---
                            </ItemRow>
                            {get(order, 'deliveryOptions.shipmentFee') > 0 && (
                                <ItemRow label='Phí vận chuyển' colLabel={12} colChildren={11}>
                                    {formatMoney(order.deliveryOptions?.shipmentFee || 0)} đ
                                </ItemRow>
                            )}
                            <ItemRow label='Tổng tiền phải trả' colLabel={12} colChildren={11}>
                                {formatMoney(feeForCustomer)} đ
                            </ItemRow>
                            <Divider style={{ margin: '5px 0' }} />
                            <ItemRow label='Số tiền đã thanh toán' colLabel={12} colChildren={11}>
                                {order.paidAt ? formatMoney(feeForCustomer) : 0} đ
                            </ItemRow>
                        </div>
                    </div>
                </Space>
            </>
        );
    };

    return (
        <Card bodyStyle={{ padding: 0 }} className='card-shadow'>
            <div className='order-detail'>{renderContent()}</div>
        </Card>
    );
};

export default Order;
