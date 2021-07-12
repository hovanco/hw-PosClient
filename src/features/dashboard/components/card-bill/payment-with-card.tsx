import { Col, Input, InputNumber, Row } from 'antd';
import React, { FC } from 'react';
import { formatterInput, parserInput } from '../../../../utils/formatMoney';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { Payment } from '../../pages/sales-counters/state/interface';

interface Props {
    payment: Payment;
}

const PaymentWithCard: FC<Props> = ({ payment }) => {
    const { updatePayment } = useSalesCounter();
    const onChange = (value?: string | number) => {
        const new_payment = { ...payment, value: Number(value) };

        updatePayment(new_payment);
    };

    const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const new_payment = { ...payment, code: e.target.value };

        updatePayment(new_payment);
    };

    return (
        <Row gutter={5}>
            <Col span={8}>
                <InputNumber
                    onChange={onChange}
                    value={payment.value}
                    parser={parserInput}
                    formatter={formatterInput}
                />
            </Col>

            <Col span={16}>
                <Input
                    addonBefore='Mã chuẩn chi'
                    onChange={onChangeCode}
                    value={payment.standard_code}
                />
            </Col>
        </Row>
    );
};

export default PaymentWithCard;
