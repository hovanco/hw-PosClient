import { IState, Payment } from './interface';
import { types } from './types';

export const initialState: IState = {
    products: [],
    payments: [],
    customer: undefined,
    shipment: 0,
    customerNote: undefined,
    moneyCustomer: 0,
    isEdit: false,
    delivered: false,
    sale: false,
    isRestrictAction: false,
    createdBy: undefined,
};

interface IAction {
    type: string;
    payload: any;
}

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.LOAD_NEW_ORDER_DRAFT:
            state.products = action.payload.products;
            state.payments = action.payload.payments;
            state.customer = action.payload.customer;
            state.shipment = action.payload.shipment;
            state.customerNote = action.payload.customerNote;
            state.moneyCustomer = action.payload.moneyCustomer;
            state.isEdit = action.payload.isEdit;
            state.delivered = action.payload.delivered;
            state.sale = action.payload.sale;
            state.isRestrictAction = action.payload.isRestrictAction;
            state.createdBy = action.payload.createdBy;
            state.id = action.payload.id;

            return;

        case types.ADD_PRODUCT: {
            const product = state.products.find((product) => product._id === action.payload._id);

            if (product) {
                state.products = state.products.map((product) => {
                    if (product._id === action.payload._id)
                        return { ...product, count: product.count + 1 };
                    return product;
                });
            } else {
                state.products.unshift({ ...action.payload, count: 1 });
            }

            if (!state.isEdit) {
                state.isEdit = true;
            }

            return;
        }

        case types.REMOVE_PRODUCT:
            state.products = state.products.filter((product) => product._id !== action.payload._id);
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.ADD_CUSTOMER:
            state.customer = action.payload;
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.UPDATE_QUANTITY:
            state.products = state.products.map((product) => {
                if (product._id === action.payload._id) return action.payload;
                return product;
            });

            return;

        case types.ADD_PAYMENT:
            state.payments.push(action.payload);
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.UPDATE_PAYMENT:
            state.payments = state.payments.map((payment: Payment) => {
                if (payment.type === action.payload.type) return action.payload;
                return payment;
            });

            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.REMOVE_PAYMENT: {
            state.payments = state.payments.filter(
                (payment) => payment.type !== action.payload.type,
            );
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;
        }

        case types.ADD_CUSTOMER_NOTE:
            state.customerNote = action.payload;
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.CHANGE_DELIVERED:
            state.delivered = action.payload;
            return;

        case types.CHANGE_SALE:
            state.sale = action.payload;
            return;

        case types.ADD_SHIPMENT:
            state.shipment = action.payload;
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.CHANGE_IS_RESTRICT_ACTION: {
            state.isRestrictAction = action.payload;
            return;
        }

        case types.RESET:
            state.products = [];
            state.payments = [];
            state.customer = undefined;
            state.shipment = 0;
            state.customerNote = undefined;
            state.moneyCustomer = 0;
            state.isEdit = false;
            state.delivered = false;
            state.sale = false;
            state.isRestrictAction = false;
            state.createdBy = undefined;
            return;

        default:
            return state;
    }
};

export default reducer;
