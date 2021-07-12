import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from 'react';
import { useImmerReducer } from 'use-immer';
import { useSelector } from 'react-redux';
import { getPackagesActive } from '../../../../../api/billing-api';
import { IPackage } from '../../../../../collections/billing';
import { ICustomer } from '../../../../../collections/customer';
import { checkRestrictAction } from '../../../../../utils/get-time';
import { Payment, ProductState, IContext } from './interface';
import { useOrdersDraft } from './orders-draft-context';
import reducer, { initialState } from './reducer';
import { types } from './types';

const initialContext = {
    state: initialState,
    dispatch: () => {},
};

const Context = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
    order: any;
}

const ProviderContext: FC<Props> = ({ children, order }) => {
    const { updateOrdersDraft } = useOrdersDraft();
    const [state, dispatch] = useImmerReducer(reducer, order || initialState);

    useEffect(() => {
        dispatch({
            type: types.LOAD_NEW_ORDER_DRAFT,
            payload: order,
        });
    }, [order.id]);

    useEffect(() => {
        if (state.id === order.id) {
            updateOrdersDraft(state);
        } else {
            dispatch({
                type: types.LOAD_NEW_ORDER_DRAFT,
                payload: order,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.id,
        state.products,
        state.payments,
        state.customer,
        state.shipment,
        state.customerNote,
        state.moneyCustomer,
        state.delivered,
        state.sale,
        state.isRestrictAction,
        state.createdBy,
    ]);

    // eslint-disable-next-line
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSalesCounter = () => {
    const value = useContext(Context);
    const { state, dispatch } = value;

    const store = useSelector((state: any) => state.store.store);

    const getPackages = async () => {
        const packages: IPackage[] = await getPackagesActive(store._id);
        const pkgsActive = packages.filter((item: IPackage) => item.active);

        dispatch({
            type: types.CHANGE_IS_RESTRICT_ACTION,
            payload: checkRestrictAction(pkgsActive),
        });
    };

    const addProduct = useCallback((product: ProductState) => {
        dispatch({
            type: types.ADD_PRODUCT,
            payload: product,
        });
        // eslint-disable-next-line
    }, []);

    const removeProduct = (product: ProductState) => {
        dispatch({
            type: types.REMOVE_PRODUCT,
            payload: product,
        });
    };

    const updateCount = useCallback((product: ProductState) => {
        dispatch({
            type: types.UPDATE_QUANTITY,
            payload: product,
        });

        // eslint-disable-next-line
    }, []);

    const addCustomer = useCallback((customer: ICustomer) => {
        dispatch({
            type: types.ADD_CUSTOMER,
            payload: customer,
        });

        // eslint-disable-next-line
    }, []);

    const addPayment = useCallback((payment: Payment) => {
        dispatch({
            type: types.ADD_PAYMENT,
            payload: payment,
        });

        // eslint-disable-next-line
    }, []);

    const updatePayment = useCallback((payment: Payment) => {
        dispatch({
            type: types.UPDATE_PAYMENT,
            payload: payment,
        });

        // eslint-disable-next-line
    }, []);

    const removePayment = useCallback((payment: Payment) => {
        dispatch({
            type: types.REMOVE_PAYMENT,
            payload: payment,
        });

        // eslint-disable-next-line
    }, []);

    const addShipment = useCallback((shipment: number) => {
        dispatch({
            type: types.ADD_SHIPMENT,
            payload: shipment,
        });

        // eslint-disable-next-line
    }, []);

    const addCustomerNote = useCallback((note: string) => {
        dispatch({
            type: types.ADD_CUSTOMER_NOTE,
            payload: note,
        });

        // eslint-disable-next-line
    }, []);

    const changeDelivered = useCallback((check: boolean) => {
        dispatch({
            type: types.CHANGE_DELIVERED,
            payload: check,
        });

        // eslint-disable-next-line
    }, []);

    const changeSale = useCallback((check: boolean) => {
        dispatch({
            type: types.CHANGE_SALE,
            payload: check,
        });

        // eslint-disable-next-line
    }, []);

    const resetOrder = useCallback(() => {
        dispatch({
            type: types.RESET,
        });

        // eslint-disable-next-line
    }, []);

    return {
        ...state,
        addProduct,
        removeProduct,
        updateCount,
        addCustomer,
        addPayment,
        updatePayment,
        removePayment,
        addShipment,
        addCustomerNote,
        resetOrder,
        changeDelivered,
        changeSale,
        getPackages,
    };
};

export default ProviderContext;
