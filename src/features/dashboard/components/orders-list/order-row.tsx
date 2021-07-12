import { Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import clx from 'classnames';
import formatMoney from '../../../../utils/formatMoney';
import { getOrderStatusName, IOrder, ORDER_STATUS } from '../../../../collections/order';
import { getFeeForCustomer } from '../../ultils/order';

interface Props {
    order: IOrder;
    isDark?: boolean;
    selectOrder: (order: IOrder) => void;
}

const OrderRow: FC<Props> = ({ order, selectOrder, isDark }) => {
    const handleSelectOrder = () => selectOrder(order);

    const status = getOrderStatusName(order.status);

    return (
        <Row
            className={clx('order-row', { isDark })}
            align='middle'
            onClick={handleSelectOrder}
            justify='space-between'
        >
            <Col className='order-code'>
                <Tooltip placement="bottom" title={order.code} >
                    {order.code}
                </Tooltip>
            </Col>
            <Col className={clx('order-status', { done: order.status === ORDER_STATUS.DELIVERED })}>
                {status}
            </Col>
            <Col className={clx('paid-status', { done: !!order.paidAt })}>
                {order.paidAt ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Col>
            <Col className='order-price'>
                <div>
                    <span className='price'>{formatMoney(getFeeForCustomer(order))}</span>
                    <br />
                    {`${moment(order.createdAt).format('HH')}h${moment(order.createdAt).format(
                        'mm'
                    )} - ${moment(order.createdAt).format('DD/MM/YYYY')}`}
                </div>
            </Col>
        </Row>
    );
};

export default OrderRow;
