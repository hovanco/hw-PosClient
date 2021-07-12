import { InputNumber } from 'antd';
import React from 'react';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { formatterInput, parserInput } from '../../../../utils/formatMoney';

interface Props {}

const Shipment = (props: Props) => {
    const { addShipment } = useSalesCounter();

    const onChange = (shipment?: number | string) => {
        if (typeof shipment !== 'undefined') {
            addShipment(Number(shipment));
        }
    };
    return (
        <>
            <InputNumber
                onChange={onChange}
                formatter={(value?: string | number) => formatterInput(value)}
                parser={(value?: string) => parserInput(value)}
            />{' '}
            đ
        </>
    );
};

export default Shipment;
