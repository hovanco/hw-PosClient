import { InputNumber } from 'antd';
import React, { FC } from 'react';
import { formatterInput, parserInput } from '../../../../utils/formatMoney';
import { Payment } from '../../pages/sales-counters/state/interface';

interface Props {
    payment: Payment;
}

const PaymentWithWallet: FC<Props> = ({ payment }) => {
    return (
        <InputNumber
            style={{ width: '100%' }}
            placeholder='Nhập tiền khách đưa (F4)'
            min={0}
            parser={parserInput}
            formatter={formatterInput}
        />
    );
};
export default PaymentWithWallet;
