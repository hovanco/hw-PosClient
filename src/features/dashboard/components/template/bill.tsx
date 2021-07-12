import JsBarcode from 'jsbarcode';
import { compact, get, map } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import InsaPosLogo from '../../../../assets/images/insa-pos-logo.svg';
import { IOrderBill } from '../../../../collections/order';
import { IProduct } from '../../../../collections/product';
import formatMoney from '../../../../utils/formatMoney';
import { formatDateTime } from '../../ultils/format';
interface Props {
    order: IOrderBill;
    isNew?: boolean;
}
interface IBillProduct extends IProduct {
    count: number;
}

const BillToPrintComponent = React.forwardRef(({ order, isNew = true }: Props, ref: any) => {
    const store = useSelector((state: any) => state.store.store);
    const user = useSelector((state: any) => state.auth.user);
    const { products } = order;

    useEffect(() => {
        JsBarcode('#code', get(order, 'code'), { displayValue: false });
    }, [order]);

    const warehouseInfo = {
        name: get(order, 'warehouseId.name'),
        address: compact([
            get(order, 'warehouseId.address'),
            get(order, 'warehouseId.wardName'),
            get(order, 'warehouseId.districtName'),
            get(order, 'warehouseId.provinceName'),
        ]).join(', '),
        phone: get(order, 'warehouseId.phoneNo'),
    };

    const customerInfo = {
        name: get(order, 'customer.name'),
        phone: get(order, 'customer.phoneNo'),
    };

    const totalPriceProduct = order.products.reduce(
        (value, product) => value + product.count * product.price,
        0,
    );
    const quantityProduct = order.products.reduce((value, product) => value + product.count, 0);

    const orderProducts = useMemo(
        () =>
            map(products, (item: IBillProduct, index: number) => (
                <tr
                    style={{ verticalAlign: 'top' }}
                    key={get(item, 'productId._id') || get(item, 'productId') || index}
                >
                    <td
                        style={{
                            width: '45%',
                            textAlign: 'left',
                            padding: '5px 0px',
                        }}
                    >
                        {get(item, 'productId.name')} <br />
                        {item.count}
                    </td>
                    <td
                        style={{
                            width: '25%',
                            textAlign: 'left',
                            padding: '5px 0px',
                        }}
                    >
                        {formatMoney(item.price)} đ
                    </td>
                    <td
                        style={{
                            width: '30%',
                            textAlign: 'right',
                            padding: '5px 0px',
                        }}
                    >
                        {formatMoney(+item.count * +item.price)} đ
                    </td>
                </tr>
            )),
        [products],
    );

    const getMoneyCustomer = function (): number {
        const moneyCustomer = get(order, 'moneyCustomer');

        if (moneyCustomer) {
            return moneyCustomer;
        }

        const paidAt = get(order, 'paidAt');

        if (paidAt) {
            return get(order, 'valuePayment');
        }

        return 0;
    };

    return (
        <div
            ref={ref}
            style={{
                fontSize: 12,
                lineHeight: 1.5,
                fontFamily: 'Helvetica, sans-serif',
                pageBreakAfter: 'always',
                padding: '15px',
            }}
        >
            <div
                style={{
                    borderBottom: '1px dashed #000',
                    textAlign: 'center',
                    padding: '0 0 10px',
                    marginBottom: 10,
                }}
            >
                <img
                    src={InsaPosLogo}
                    alt={'Insa Pos'}
                    style={{ display: 'inline-block', height: 35 }}
                />
            </div>
            <div>Chi nhánh: {warehouseInfo.name}</div>
            <div>Địa chỉ: {warehouseInfo.address}</div>
            <div>Số ĐT: {warehouseInfo.phone}</div>
            {/* <div>Website: insa.app</div>
            <div>Email: --</div> */}
            <div style={{ borderTop: '1px dashed #000', margin: '0.7em 0' }} />
            <div>Nhân viên: {isNew ? user.name : store.name}</div>
            <div>Ngày bán: {formatDateTime(order.createdAt)}</div>
            <div style={{ fontWeight: 'bold', textAlign: 'center' }}>HOÁ ĐƠN {order.code}</div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <svg id='code'></svg>
                </div>
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Khách hàng:</span> {customerInfo.name}
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Số ĐT:</span> {customerInfo.phone}
            </div>
            <table
                style={{
                    margin: '1em 0 0',
                    fontSize: 12,
                    width: '100%',
                    borderSpacing: 0,
                }}
            >
                <thead>
                    <tr style={{ borderBottom: '1px solid #000' }}>
                        <th
                            style={{
                                width: '45%',
                                textAlign: 'left',
                                padding: '5px 0px',
                                borderTop: '1px solid #000',
                                borderBottom: '1px solid #000',
                                margin: 0,
                            }}
                        >
                            SP/SL
                        </th>
                        <th
                            style={{
                                width: '25%',
                                textAlign: 'left',
                                padding: '5px 0px',
                                borderTop: '1px solid #000',
                                borderBottom: '1px solid #000',
                                margin: 0,
                            }}
                        >
                            Đ/giá
                        </th>
                        <th
                            style={{
                                width: '30%',
                                textAlign: 'right',
                                padding: '5px 0px',
                                borderTop: '1px solid #000',
                                borderBottom: '1px solid #000',
                                margin: 0,
                            }}
                        >
                            T/Tiền
                        </th>
                    </tr>
                </thead>
                <tbody>{orderProducts}</tbody>
            </table>
            <div
                style={{
                    borderBottom: '1px dashed #000',
                    borderTop: '1px dashed #000',
                    textAlign: 'right',
                    padding: '0.7em 0',
                }}
            >
                <div style={{ display: 'inline-block' }}>
                    <table
                        style={{
                            width: '100%',
                            fontSize: 12,
                            textAlign: 'right',
                        }}
                    >
                        <tbody>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>Tổng số lượng:</td>
                                <td style={{ padding: '3px 0' }}>{quantityProduct}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>Tổng tiền:</td>
                                <td style={{ padding: '3px 0' }}>
                                    {formatMoney(totalPriceProduct)} đ
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>Phí vận chuyển:</td>
                                <td style={{ padding: '3px 0' }}>
                                    {formatMoney(
                                        get(order, 'deliveryOptions.shipmentFeeForCustomer'),
                                    )}{' '}
                                    đ
                                </td>
                            </tr>
                            <tr style={{ fontWeight: 'bold' }}>
                                <td style={{ padding: '3px 5px 3px 0' }}>Thành tiền:</td>
                                <td style={{ padding: '3px 0' }}>
                                    {formatMoney(get(order, 'valuePayment'))} đ
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>Tiền khách đưa:</td>
                                <td style={{ padding: '3px 0' }}>
                                    {formatMoney(getMoneyCustomer())} đ
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>Tiền thừa trả khách:</td>
                                <td style={{ padding: '3px0' }}>
                                    {formatMoney(
                                        getMoneyCustomer() -
                                            (totalPriceProduct +
                                                (get(
                                                    order,
                                                    'deliveryOptions.shipmentFeeForCustomer',
                                                ) || 0)),
                                    )}{' '}
                                    đ
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {get(order, 'deliveryOptions.customerNote') && (
                <div
                    style={{
                        borderBottom: '1px dashed #000',
                        padding: '.7em 0',
                        marginBottom: '1em',
                    }}
                >
                    <div>Ghi chú: </div>
                    <div>{get(order, 'deliveryOptions.customerNote')}</div>
                </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 15 }}>
                <span style={{ fontSize: 14 }}>Thank you</span>
                <br />
                <span style={{ fontSize: 11 }}>Powered by Insa</span>
            </div>
        </div>
    );
});

export default BillToPrintComponent;
