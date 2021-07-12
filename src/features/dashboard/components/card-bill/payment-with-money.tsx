import { InputNumber } from 'antd';
import React, { FC, useEffect, useRef } from 'react';
import { formatterInput, parserInput } from '../../../../utils/formatMoney';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { Payment } from '../../pages/sales-counters/state/interface';

interface Props {
    payment: Payment;
}

const PaymentWithMoney: FC<Props> = ({ payment }) => {
    const { updatePayment } = useSalesCounter();
    const inputRef = useRef<any>(null);

    const focusInput = (e: KeyboardEvent) => {
        if (e.code === 'F4' && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const onChange = (value?: string | number) => {
        if (value) {
            const new_payment = {
                ...payment,
                value: Number(value),
            };

            updatePayment(new_payment);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', focusInput);

        return () => {
            document.removeEventListener('keydown', focusInput);
        };
    }, []);

    return (
        <InputNumber
            ref={inputRef}
            style={{ width: '100%' }}
            placeholder='Nhập tiền khách đưa (F4)'
            min={0}
            parser={parserInput}
            formatter={formatterInput}
            onChange={onChange}
            value={Number(payment.value)}
        />
    );
};

export default PaymentWithMoney;
