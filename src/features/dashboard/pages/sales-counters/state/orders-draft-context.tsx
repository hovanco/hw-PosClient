import { Modal } from 'antd';
import { findIndex, isUndefined } from 'lodash';
import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';
import { ICustomer } from '../../../../../collections/customer';
import { IAction } from '../../order/state';
import { Payment, ProductState } from './interface';
import { types } from './types';

const ORDER_ID_DEFAULT = Date.now();

interface IOrderDraft {
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
    id: number;
}

const orderDefault: IOrderDraft = {
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
    id: ORDER_ID_DEFAULT,
};

interface IState {
    ordersDraft: IOrderDraft[];
    orderIdDraftSelected: number;
}

const initialState: IState = {
    ordersDraft: [orderDefault],
    orderIdDraftSelected: ORDER_ID_DEFAULT,
};

function reducer(state: IState, action: IAction) {
    switch (action.type) {
        case 'update_orders': {
            const newOrdersDraft = state.ordersDraft.map((order) => {
                if (order.id === action.payload.id) {
                    return action.payload;
                }

                return order;
            });

            state.ordersDraft = newOrdersDraft;
            return;
        }

        case types.ADD_ORDER_DRAFT: {
            const id = Date.now();

            state.ordersDraft = [
                ...state.ordersDraft,
                {
                    ...orderDefault,
                    id,
                },
            ];
            state.orderIdDraftSelected = id;
            return;
        }

        case types.CLOSE_ORDER_DRAFT: {
            if (state.orderIdDraftSelected === action.payload && state.ordersDraft.length > 1) {
                const index = findIndex(state.ordersDraft, (order) => order.id === action.payload);
                if (index + 1 === state.ordersDraft.length) {
                    state.orderIdDraftSelected = state.ordersDraft[index - 1].id;
                } else {
                    state.orderIdDraftSelected = state.ordersDraft[index + 1].id;
                }
            }

            state.ordersDraft = state.ordersDraft.filter((order) => order.id !== action.payload);
            return;
        }

        case types.SELECT_ORDER_DRAFT:
            state.orderIdDraftSelected = action.payload;
            return;

        default:
            return state;
    }
}

const intialContext = {
    state: initialState,
    dispatch: () => {},
};

interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}

const Context = createContext<IContext>(intialContext);

interface Props {
    children: ReactNode;
}

export const ProviderOrdersDraft: FC<Props> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useOrdersDraft() {
    const { state, dispatch } = useContext(Context);

    function addOrderDraft() {
        dispatch({
            type: types.ADD_ORDER_DRAFT,
        });
    }

    function selectOrderDraft(orderId: number | string) {
        dispatch({
            type: types.SELECT_ORDER_DRAFT,
            payload: orderId,
        });
    }

    function dispatchCloseOrderDraft(orderId: string | number) {
        dispatch({
            type: types.CLOSE_ORDER_DRAFT,
            payload: orderId,
        });
    }

    function closeOrderDraft(order: IOrderDraft) {
        if (!isUndefined(order.customer) || order.products.length > 0) {
            Modal.confirm({
                type: 'warning',
                title: 'Bạn chắc chắn muốn hủy đơn hàng',
                onCancel() {},
                onOk() {
                    dispatchCloseOrderDraft(order.id);
                },
                okText: 'Hủy đơn',
                cancelText: 'Thoát',
            });
        } else {
            dispatchCloseOrderDraft(order.id);
        }
    }

    function updateOrdersDraft(order: IOrderDraft) {
        dispatch({
            type: 'update_orders',
            payload: order,
        });
    }

    return {
        ...state,
        addOrderDraft,
        selectOrderDraft,
        updateOrdersDraft,
        closeOrderDraft,
    };
}
