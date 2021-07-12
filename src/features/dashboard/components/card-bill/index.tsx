import { Card } from 'antd';
import React, { useMemo } from 'react';
import { ItemRow } from '../../../../components';
import formatMoney from '../../../../utils/formatMoney';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { Payment } from '../../pages/sales-counters/state/interface';
import { totalPriceProduct } from '../../ultils/order';
import BtnPay from './btn-pay';
import Payments from './payments';
import Shipment from './shipment';

interface Props {}

const CardBill = (props: Props) => {
    const { products, customer, shipment, payments, isRestrictAction } = useSalesCounter();

    const totalMoney = useMemo(() => totalPriceProduct(products) + shipment, [products, shipment]);

    const paymentValue: number[] = payments.map((payment: Payment) => {
        return Number(payment.value);
    });

    const moneyCustomer = paymentValue.reduce((value: number, item: number) => item + value, 0);

    const isDisabled = moneyCustomer - totalMoney < 0;

    return (
        <Card
            className='card-shadow'
            bodyStyle={{
                padding: '16px 24px',
            }}
            style={{ height: '100%' }}
        >
            {customer && (
                <>
                    <div className='title-card-underline '>
                        <span>Thông tin hóa đơn</span>
                    </div>

                    <div className='bill'>
                        <div className='cutomer-info bill-row'>
                            <ItemRow label='Tên Khách hàng'>{customer.name}</ItemRow>
                            <ItemRow label='Số điện thoại'>{customer.phoneNo}</ItemRow>
                        </div>

                        <div className='customer-payment bill-row'>
                            <div className='bill-row-title'>HÌNH THỨC THANH TOÁN</div>

                            <Payments />
                        </div>

                        <div className='pay bill-row'>
                            <div className='bill-row-title'>Thanh toán</div>
                            <ItemRow label='Tạm tính'>{formatMoney(totalMoney)} đ</ItemRow>
                            {/* <ItemRow
                                label={
                                    <span style={{ color: '#307dd2' }}>Voucher/ khuyến mãi</span>
                                }
                            >
                                0 đ
                            </ItemRow> */}
                            <ItemRow label='Phí vận chuyển'>
                                <Shipment />
                            </ItemRow>
                        </div>

                        <div className='total bill-row border-none'>
                            <ItemRow label='THÀNH TIỀN'>{formatMoney(totalMoney)} đ</ItemRow>
                            <ItemRow label='Tiền khách đưa'>{formatMoney(moneyCustomer)} đ</ItemRow>
                            <ItemRow label='Tiền thừa trả khách'>
                                {formatMoney(moneyCustomer - totalMoney)} đ
                            </ItemRow>
                        </div>

                        <BtnPay disabled={isDisabled || isRestrictAction} />
                    </div>
                </>
            )}
        </Card>
    );
};

export default CardBill;
