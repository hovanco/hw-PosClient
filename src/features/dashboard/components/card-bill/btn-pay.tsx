import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Typography } from 'antd';
import { get, pick } from 'lodash';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import orderApi from '../../../../api/order-api';
import { IOrder, ORDER_STATUS } from '../../../../collections/order';
import { INVALID_PRODUCTS_QUANTITY } from '../../../../constants/error';
import useKey from '../../../../hook/useKey';
import useLoading from '../../../../hook/useLoading';
import useVisble from '../../../../hook/useVisible';
import formatMoney from '../../../../utils/formatMoney';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { Payment, ProductState } from '../../pages/sales-counters/state/interface';
import { totalPriceProduct } from '../../ultils/order';
import ProductQuantityInvalid from './products-quantity-invalid';
import SuccessOrder from './success-order';

interface Props {
    disabled: boolean;
}

const BtnPay: FC<Props> = ({ disabled }) => {
    const { visible, toggle } = useVisble();
    const [showError, setShowError] = useState<boolean>(false);
    const {
        createdBy,
        products,
        shipment,
        customer,
        customerNote,
        changeSale,
        changeDelivered,
        delivered,
        payments,
    } = useSalesCounter();
    const store = useSelector((state: any) => state.store.store);
    const warehouseId = useSelector((state: any) => state.store.warehouseId);
    const { loading, handleLoading } = useLoading();

    const [order, setOrder] = useState<IOrder>();

    const paymentValue: number[] = payments.map((payment: Payment) => {
        return Number(payment.value);
    });

    const moneyCustomer = paymentValue.reduce((value: number, item: number) => item + value, 0);

    const payOrder = async () => {
        if (!customer || products.length === 0) {
            return;
        }

        const productsData = products.map((product: ProductState) => ({
            ...pick(product, ['count', 'price']),
            productId: product._id,
        }));

        const customerData = pick(customer, ['_id', 'name', 'phoneNo']);

        try {
            handleLoading(true);

            const data = {
                storeId: store._id,
                data: {
                    customer: customerData,
                    products: productsData,
                    warehouseId,
                    deliveryOptions: {
                        shipmentFee: shipment,
                        shipmentFeeForCustomer: shipment,
                        serviceId: 0,
                        transportType: 0,
                        customerNote,
                        feeForReceiver: 0,
                        shipmentFeeByTotal: true,
                    },
                    source: 'pos',
                    createdBy,
                },
            };

            const order = await orderApi.createOrder(data);

            await orderApi.updateStatusOrder({
                storeId: store._id,
                orderId: order._id,
                data: {
                    status: delivered ? ORDER_STATUS.DELIVERED : ORDER_STATUS.DELIVERING,
                },
            });

            await orderApi.confirmPaymentOrder({
                storeId: store._id,
                orderId: order._id,
            });

            toggle();
            setOrder({ ...order, moneyCustomer });
        } catch (error) {
            const errorMessage = get(error.response, 'data.message');

            if (errorMessage === INVALID_PRODUCTS_QUANTITY) {
                setShowError(true);
            } else {
                message.error('Lỗi tạo đơn hàng');
            }
        } finally {
            handleLoading(false);
        }
    };

    const handlePay = () => {
        if (!loading) {
            payOrder();
        }
    };

    useKey({ key: 'F1', callback: handlePay });

    const price = totalPriceProduct(products) + shipment;

    const isDisable =
        useMemo(() => !customer || products.length === 0, [customer, products]) || disabled;

    useEffect(() => {
        changeSale(!isDisable);
        if (!isDisable) {
            changeDelivered(true);
        }
    }, [isDisable]);

    return (
        <>
            <Button
                type='primary'
                size='large'
                block
                onClick={payOrder}
                loading={loading}
                disabled={isDisable}
            >
                THANH TOÁN {price > 0 && `${formatMoney(price)} đ`} (F1)
            </Button>

            <Modal
                visible={showError}
                title={
                    <div style={{ textAlign: 'center' }}>
                        <CloseCircleOutlined style={{ color: 'red', fontSize: 30 }} />

                        <Typography style={{ marginTop: 10 }}>
                            Sản phẩm hết hàng hoặc không đủ số lượng hàng bán, vui lòng điều chỉnh
                            đơn hàng.
                        </Typography>
                    </div>
                }
                maskClosable={false}
                keyboard={false}
                cancelText='Đóng'
                onCancel={() => setShowError(false)}
                destroyOnClose
                footer={null}
                closable={false}
            >
                <ProductQuantityInvalid onCancel={() => setShowError(false)} />
            </Modal>

            <Modal
                visible={visible}
                onCancel={toggle}
                closable={false}
                maskClosable={false}
                keyboard={false}
                footer={null}
            >
                <SuccessOrder toggle={toggle} order={order} />
            </Modal>
        </>
    );
};

export default BtnPay;
