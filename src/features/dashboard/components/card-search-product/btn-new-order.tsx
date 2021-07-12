import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { useSalesCounter } from '../../pages/sales-counters/state/context';

interface Props {}

const BtnNewOrder = (props: Props) => {
    const { isEdit, resetOrder, isRestrictAction } = useSalesCounter();

    const onClick = () => {
        if (isEdit) {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn tạo đơn hàng mới',
                okText: 'Tạo đơn mới',
                onCancel() {},
                onOk() {
                    resetOrder();
                },
            });
        } else {
            resetOrder();
        }
    };

    return (
        <Button
            type='primary'
            icon={<PlusCircleOutlined />}
            disabled={isRestrictAction}
            onClick={onClick}
        >
            Đơn hàng mới
        </Button>
    );
};

export default BtnNewOrder;
