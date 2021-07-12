import types from './types';
import { IState, IAction } from './interface';

const initialState: IState = {
    loading: false,
    page: 1,
    limit: 20,
    search: undefined,
    orders: [],
    order: undefined,
    total: 0,
    typeTime: 'custom',
    time: undefined,
};

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.LOADING:
            state.loading = true;
            return;

        case types.CHANGE_SEARCH:
            state.search = action.payload;
            state.loading = true;
            return;

        case types.SEARCH_ORDERS:
            state.page = 1;
            state.total = action.payload.total;
            state.orders = action.payload.orders;
            state.loading = false;
            return;

        case types.LOAD_ORDERS:
            state.loading = false;
            state.total = action.payload.total;
            state.orders = [...state.orders, ...action.payload.orders];

            return;

        case types.SELECT_ORDER:
            state.order = action.payload;
            return;

        case types.SELECT_TIME:
            state.loading = true;
            state.typeTime = action.payload.typeTime;
            state.time = action.payload.time;
            return;

        default:
            return state;
    }
};

export { initialState, reducer };
