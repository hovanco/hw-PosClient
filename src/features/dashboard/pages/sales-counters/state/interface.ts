import { ICustomer } from '../../../../../collections/customer';
import { Product as IProduct } from '../../../../../collections/product';
import { IPayment } from '../../../components/card-bill/payments';

export interface ProductState extends IProduct {
    count: number;
}

export interface Payment extends IPayment {
    value: number;
    standard_code?: string;
}

export type IState = {
    products: ProductState[];
    payments: Payment[];
    customer?: ICustomer;
    shipment: number;
    customerNote?: string;
    moneyCustomer: number;
    isEdit: boolean;
    delivered: boolean;
    sale: boolean;
    isRestrictAction: boolean;
    createdBy?: string;
    id?: string | number;
};

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}
