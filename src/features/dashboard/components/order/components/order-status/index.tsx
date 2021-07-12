import { Button } from 'antd';
import React, { FC } from 'react';
import { getOrderStatusName, ORDER_STATUS } from '../../../../../../collections/order';

interface Props {
    status: ORDER_STATUS;
}

const OrderStatus: FC<Props> = ({ status }) => {
    const title = getOrderStatusName(status);
    return (
        <Button
            type='primary'
            danger={status !== ORDER_STATUS.DELIVERED}
            style={{ borderRadius: 15 }}
        >
            {title}
        </Button>
    );
};

export default OrderStatus;
