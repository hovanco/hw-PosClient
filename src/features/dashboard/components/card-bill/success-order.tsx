import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';
import { find, get } from 'lodash';
import moment from 'moment';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IOrder, IOrderBill } from '../../../../collections/order';
import storeImg from '../../assets/images/store-blue.svg';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { getFeeForCustomer } from '../../ultils/order';
import OrderPrint from '../order/components/order-print';

interface Props {
    toggle: () => void;
    order?: IOrder;
}

const SuccessOrder: FC<Props> = ({ toggle, order }) => {
    const { resetOrder } = useSalesCounter();
    const { warehouses } = useSelector((state: any) => state.store);

    const handleNewOrder = async () => {
        await toggle();

        setTimeout(() => {
            resetOrder();
        }, 300);
    };

    const handlePrintBill = () => {
        toggle();

        setTimeout(() => {
            resetOrder();
        }, 300);
    };

    if (!order) {
        return <></>;
    }

    const orderPrint: IOrderBill = {
        ...(order as IOrder),
        valuePayment: getFeeForCustomer(order),
        warehouseId: find(warehouses, { _id: (order as IOrder).warehouseId }),
        paidAt: moment().toString(),
        moneyCustomer: get(order, 'moneyCustomer'),
    };

    return (
        <Row align='middle' justify='center' className='success-order'>
            <Col style={{ paddingTop: 30, paddingBottom: 30 }}>
                <Space style={{ width: '100%' }} size={15} direction='vertical'>
                    <img src={storeImg} alt='' />
                    <div className='title'>Thanh toán thành công</div>
                    <span>Mã đơn hàng: {order && order.code}</span>
                    <Space size={15}>
                        <Button icon={<PlusCircleOutlined />} onClick={handleNewOrder}>
                            Đơn hàng mới
                        </Button>
                        <OrderPrint order={orderPrint} callback={handlePrintBill} isNew />
                    </Space>
                </Space>
            </Col>
        </Row>
    );
};

export default SuccessOrder;
