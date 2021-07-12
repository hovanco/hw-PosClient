import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

import React from 'react';

import { useSalesCounter } from '../../pages/sales-counters/state/context';

interface Props {}

const BtnCancelOrder = (props: Props) => {
    const { isEdit, resetOrder } = useSalesCounter();
    const handleCancelOrder = () => {
        if (isEdit) {
            Modal.confirm({
                type: 'warning',
                title: 'Bạn chắc chắn muốn hủy đơn hàng',
                onCancel() {},
                onOk() {
                    resetOrder();
                },
                okText: 'Hủy đơn',
                cancelText: 'Thoát',
            });
        } else {
            resetOrder();
        }
    };

    return (
        <Button
            type='text'
            icon={<CloseCircleOutlined />}
            className='btn-cancel-order'
            onClick={handleCancelOrder}
        >
            Hủy đơn hàng
        </Button>
    );
};

export default BtnCancelOrder;
