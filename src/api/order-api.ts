import { ORDER_STATUS } from '../collections/order';
import axiosClient from './axios-client';

export interface ProductData {
    productId: string;
    count: number;
    price: number;
}

export interface CustomerData {
    _id: string;
    name: string;
    phoneNo: string;
}

async function getOrders({
    storeId,
    page = 1,
    limit = 20,
    search,
    startTime,
    endTime,
}: {
    storeId: string;
    page?: number;
    limit?: number;
    search?: string;
    startTime?: number;
    endTime?: number;
}): Promise<any> {
    const url = `/store/v1/stores/${storeId}/orders`;

    const response = await axiosClient({
        url,
        method: 'GET',
        params: {
            search,
            limit,
            page,
            startTime,
            endTime,
            source: 'pos',
        },
    });

    return response;
}

async function createOrder({
    storeId,
    data,
}: {
    storeId: string;
    data: {
        products: ProductData[];
        customer: CustomerData;
        deliveryOptions: any;
        warehouseId?: string;
        source?: string;
    };
}): Promise<any> {
    const res = await axiosClient({
        method: 'POST',
        url: `/store/v1/stores/${storeId}/orders`,
        data,
    });

    return res;
}

async function getOrder({ orderId, storeId }: { orderId: string; storeId: string }) {
    const res = await axiosClient({
        method: 'GET',
        url: `/store/v1/stores/${storeId}/orders/${orderId}`,
    });

    return res;
}

async function updateStatusOrder({
    storeId,
    orderId,
    data,
}: {
    storeId: string;
    orderId: string;
    data: { status: ORDER_STATUS };
}): Promise<any> {
    const url = `/store/v1/stores/${storeId}/orders/${orderId}`;

    const res = await axiosClient({
        method: 'PUT',
        url: url,
        data,
    });

    return res.data;
}
async function confirmPaymentOrder({
    storeId,
    orderId,
}: {
    storeId: string;
    orderId: string;
}): Promise<any> {
    const url = `/store/v1/stores/${storeId}/orders/${orderId}/confirm-payment`;

    const res = await axiosClient({
        method: 'POST',
        url: url,
    });

    return res.data;
}

const orderApi = {
    getOrders,
    createOrder,
    updateStatusOrder,
    confirmPaymentOrder,
    getOrder,
};

export default orderApi;
