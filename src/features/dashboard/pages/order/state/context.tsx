import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';
import types from './types';
import { IContext } from './interface';
import { initialState, reducer } from './reducer';
import orderApi from '../../../../../api/order-api';
import { useSelector } from 'react-redux';
import moment from 'moment';

const initialContext = {
    state: initialState,
    dispatch: () => {},
};

const OrdersContext = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
}

const ProvicerOrderContext: FC<Props> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

const useOrders = () => {
    const store = useSelector((state: any) => state.store.store);

    const value = useContext(OrdersContext);

    const { state, dispatch } = value;

    const setLoading = () => {
        dispatch({
            type: types.LOADING,
        });
    };

    const searchOrders = async (text: string) => {
        await dispatch({
            type: types.CHANGE_SEARCH,
            payload: text,
        });

        await getOrders({
            search: text,
            type: 'search',
        });
    };

    const getOrders = async ({
        search,
        page,
        type,
        time,
    }: {
        search?: string;
        page?: number;
        type?: string;
        time?: string | string[];
    }) => {
        try {
            const startTime = !time
                ? undefined
                : typeof time === 'string'
                ? Math.floor(moment(time).startOf('day').valueOf())
                : Math.floor(moment(time[0]).startOf('day').valueOf());
            const endTime = !time
                ? undefined
                : typeof time === 'string'
                ? Math.floor(moment(time).endOf('day').valueOf())
                : Math.floor(moment(time[1]).endOf('day').valueOf());

            const response = await orderApi.getOrders({
                storeId: store._id,
                search,
                page,
                startTime,
                endTime,
            });

            const typeAction = type === 'search' ? types.SEARCH_ORDERS : types.LOAD_ORDERS;

            dispatch({
                type: typeAction,
                payload: {
                    orders: response.data,
                    total: response.total,
                },
            });
        } catch (error) {
            dispatch({
                type: types.LOAD_ORDERS,
                payload: [],
            });
        }
    };

    const selectOrder = (order: any) => {
        dispatch({
            type: types.SELECT_ORDER,
            payload: order,
        });
    };

    const setPage = async (page: number) => {
        await dispatch({
            type: types.SET_PAGE,
            payload: page,
        });

        await getOrders({
            search: state.search,
            page: page,
        });
    };

    const selectTime = async (data: { time?: string | string[]; typeTime?: string }) => {
        await dispatch({
            type: types.SELECT_TIME,
            payload: data,
        });

        await getOrders({
            search: state.search,
            time: data.time,
            type: 'search',
        });
    };

    return {
        ...state,
        searchOrders,
        setLoading,
        getOrders,
        selectOrder,
        setPage,

        selectTime,
    };
};
export { ProvicerOrderContext, useOrders };
