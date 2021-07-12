import { IStore } from './store';
import { IWarehouse } from './warehouse';
import { IProduct } from './product';

export enum EDeliveryServiceIds {
    GHTK = 1,
    GHN = 2,
}

export enum ETransportType {
    Fast = 1,
    Medium,
}

export enum ETransportStatus {
    Picking,
    Picked,
    Storing,
    Delivering,
    Delivered,
    Return,
    Returned,
}

export enum EDeliveryDiscountBy {
    Money,
    Percent,
}

export interface TransportLog {
    status: ETransportStatus;
    updatedAt: Date;
}

export interface DeliveryOptions {
    serviceId: EDeliveryServiceIds; // id of delivery service
    transportType: ETransportType; // transport type, it should be convert to valid value before sending to delivery service
    shipmentOrderId: string; // id of transport service: ghn: order_code, ghtk: label_id
    shipmentFee: number; // Real shipment fee
    shipmentFeeForCustomer: number; // Shipment fee that will be informed to customer
    shipmentFeeByTotal: boolean; // Shipment fee should be included in total fee
    discount: number; // Discount for customer, will be set by user
    discountBy: EDeliveryDiscountBy; // Discount by money or percent
    feeForReceiver: number; // Total amount that receiver need to pay (Total product amount + shipment fee - discount)
    moneyForSender: number; // Total amount that sender will receive (Total product amount + shipment fee for customer - discount - real shipment fee)
    customerNote: string;
    noteForCustomerCare: string;
    transportStatus: ETransportStatus;
    transportLogs: TransportLog[]; // Log all changes of transport status
    noteForDelivery: string;
}

export enum ORDER_STATUS {
    NEW = 0,
    CONFIRMED = 1,
    WAIT_FOR_DELIVERY = 2, // WRAPPED
    DELIVERING = 3,
    CANCELED_RETURNING = 4,
    DELIVERED = 5,
    RETURNED = 6,
}

export const getOrderStatusName = (value: ORDER_STATUS) => {
    switch (value) {
        case ORDER_STATUS.NEW:
            return 'Mới';
        case ORDER_STATUS.CONFIRMED:
            return 'Đã xác nhận';
        case ORDER_STATUS.WAIT_FOR_DELIVERY:
            return 'Chờ lấy hàng';
        case ORDER_STATUS.DELIVERING:
            return 'Đang giao hàng';
        case ORDER_STATUS.CANCELED_RETURNING:
            return 'Đang hoàn trả';
        case ORDER_STATUS.DELIVERED:
            return 'Đã giao hàng';
        case ORDER_STATUS.RETURNED:
            return 'Đã hoàn trả';
        default:
            return '';
    }
};

export interface IOrder {
    createdBy: string | any;
    createdAt: string;
    storeId: string | IStore;
    warehouseId: string | IWarehouse;
    fbPageId: string;
    isDraft: boolean;
    products: [
        {
            _id: false;
            productId: string | IProduct;
            count: number;
            price: number;
        },
    ];
    discountId: { type: string };
    totalPrice: number;
    customer: {
        _id: string;
        fbUserId: string;
        name: string;
        phoneNo: string;
        address: string;
        province: string;
        district: string;
        ward: string;
        email: string;
    };
    note: string;
    status: ORDER_STATUS;
    paidAt: string;
    code: string;
    deliveryOptions?: {
        serviceId: { type: number };
        transportType: { type: number };
        shipmentOrderId: string;
        shipmentFee: number;
        shipmentFeeForCustomer: number;
        shipmentFeeByTotal: boolean;
        discount: number;
        discountBy: { type: number };
        feeForReceiver: number;
        moneyForSender: number;
        customerNote: string;
        noteForCustomerCare: string;
        noteForDelivery: string;
        transportStatus: string;
        transportLogs: [
            {
                _id: false;
                status: string;
                updatedAt: string;
            },
        ];
    };
}
export interface IOrderBill extends IOrder {
    valuePayment: number;
    moneyCustomer?: number;
}
