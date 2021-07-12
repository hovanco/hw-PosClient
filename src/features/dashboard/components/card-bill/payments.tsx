import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import paymentByCard from '../../assets/images/payment-by-card.svg';
import paymentByMoney from '../../assets/images/payment-by-money.svg';
// import paymentByPhone from '../../assets/images/payment-by-phone.svg';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { Payment } from '../../pages/sales-counters/state/interface';
import PaymentWithCard from './payment-with-card';
import PaymentWithMoney from './payment-with-money';
// import PaymentWithWallet from './payment-with-wallet';

export interface IPayment {
    title: string;
    icon: string;
    type: string;
}
const payments_list: IPayment[] = [
    {
        title: 'Thanh toán bằng thẻ',
        icon: paymentByCard,
        type: 'payment-by-card',
    },
    // {
    //     title: 'Ví điện tử',
    //     icon: paymentByPhone,
    //     type: 'payment-by-wallet',
    // },
    {
        title: 'Tiền mặt',
        icon: paymentByMoney,
        type: 'payment-by-money',
    },
];

interface PaymentItemProps {
    payment: IPayment;
}

const PaymentItem: FC<PaymentItemProps> = ({ payment }) => {
    const { addPayment } = useSalesCounter();
    const handleAddPayment = () => {
        addPayment({
            ...payment,
            value: 0,
        });
    };
    return (
        <Tooltip title={payment.title} placement='bottom'>
            <div onClick={handleAddPayment} className='payment-item'>
                <img src={payment.icon} alt={payment.title} />
            </div>
        </Tooltip>
    );
};

interface PaymentRowProps {
    children: any;
    payment: Payment;
}

const PaymentRow: FC<PaymentRowProps> = ({ children, payment }) => {
    const { removePayment } = useSalesCounter();
    const handleRemovePayment = () => {
        removePayment(payment);
    };

    return (
        <div style={{ marginBottom: 15 }}>
            <div style={{ marginBottom: 5 }}>
                <Space>
                    <img src={payment.icon} alt={payment.title} />
                    {payment.title}
                </Space>
            </div>
            <Row gutter={5}>
                <Col style={{ flex: 1 }}>{children}</Col>
                <Col>
                    <Button type='text' onClick={handleRemovePayment}>
                        <CloseOutlined />
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

interface Props {}

const Payments = (props: Props) => {
    const { payments } = useSalesCounter();

    const payment_types: string[] = payments.map((payment: Payment) => payment.type);

    const filter_payments_list = payments_list.filter(
        (payment: IPayment) => !payment_types.includes(payment.type)
    );

    return (
        <div>
            <div>
                {payments.map((payment: Payment) => {
                    const renderChildren = () => {
                        if (payment.type === 'payment-by-card')
                            return <PaymentWithCard payment={payment} />;
                        if (payment.type === 'payment-by-money')
                            return <PaymentWithMoney payment={payment} />;

                        // if (payment.type === 'payment-by-wallet')
                        //     return <PaymentWithWallet payment={payment} />;

                        return null;
                    };
                    return (
                        <PaymentRow payment={payment} key={payment.type}>
                            {renderChildren()}
                        </PaymentRow>
                    );
                })}
            </div>

            {filter_payments_list.length > 0 && (
                <Space direction='vertical' align='center' size={10} style={{ width: '100%' }}>
                    <div>Thêm hình thức thanh toán</div>

                    <Row gutter={15} align='middle' justify='center'>
                        {filter_payments_list.map((payment) => {
                            return (
                                <Col key={payment.type}>
                                    <PaymentItem payment={payment} />
                                </Col>
                            );
                        })}
                    </Row>
                </Space>
            )}
        </div>
    );
};

export default Payments;
