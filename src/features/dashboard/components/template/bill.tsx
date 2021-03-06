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
                        {formatMoney(item.price)} ??
                    </td>
                    <td
                        style={{
                            width: '30%',
                            textAlign: 'right',
                            padding: '5px 0px',
                        }}
                    >
                        {formatMoney(+item.count * +item.price)} ??
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
            <div>Chi nh??nh: {warehouseInfo.name}</div>
            <div>?????a ch???: {warehouseInfo.address}</div>
            <div>S??? ??T: {warehouseInfo.phone}</div>
            {/* <div>Website: insa.app</div>
            <div>Email: --</div> */}
            <div style={{ borderTop: '1px dashed #000', margin: '0.7em 0' }} />
            <div>Nh??n vi??n: {isNew ? user.name : store.name}</div>
            <div>Ng??y b??n: {formatDateTime(order.createdAt)}</div>
            <div style={{ fontWeight: 'bold', textAlign: 'center' }}>HO?? ????N {order.code}</div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <svg id='code'></svg>
                </div>
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Kh??ch h??ng:</span> {customerInfo.name}
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>S??? ??T:</span> {customerInfo.phone}
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
                            ??/gi??
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
                            T/Ti???n
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
                                <td style={{ padding: '3px 5px 3px 0' }}>T???ng s??? l?????ng:</td>
                                <td style={{ padding: '3px 0' }}>{quantityProduct}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>T???ng ti???n:</td>
                                <td style={{ padding: '3px 0' }}>
                                    {formatMoney(totalPriceProduct)} ??
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>Ph?? v???n chuy???n:</td>
                                <td style={{ padding: '3px 0' }}>
                                    {formatMoney(
                                        get(order, 'deliveryOptions.shipmentFeeForCustomer'),
                                    )}{' '}
                                    ??
                                </td>
                            </tr>
                            <tr style={{ fontWeight: 'bold' }}>
                                <td style={{ padding: '3px 5px 3px 0' }}>Th??nh ti???n:</td>
                                <td style={{ padding: '3px 0' }}>
                                    {formatMoney(get(order, 'valuePayment'))} ??
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>Ti???n kh??ch ????a:</td>
                                <td style={{ padding: '3px 0' }}>
                                    {formatMoney(getMoneyCustomer())} ??
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '3px 5px 3px 0' }}>Ti???n th???a tr??? kh??ch:</td>
                                <td style={{ padding: '3px0' }}>
                                    {formatMoney(
                                        getMoneyCustomer() -
                                            (totalPriceProduct +
                                                (get(
                                                    order,
                                                    'deliveryOptions.shipmentFeeForCustomer',
                                                ) || 0)),
                                    )}{' '}
                                    ??
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
                    <div>Ghi ch??: </div>
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
