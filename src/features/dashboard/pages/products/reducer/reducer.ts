import types from './type';
import { IState } from './interface';

export const initialReducer: IState = {
    product: undefined,
    variant: undefined,
    stocks: [],
    loading: false,
    loadingStocks: false,
    page: 1,
    limit: 20,
    search: undefined,
    products: [],
    total: 0,
};

interface IAction {
    type: string;
    payload: any;
}

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.SET_PRODUCT: {
            state.product = action.payload;

            return;
        }

        case types.SET_VARIANT: {
            state.variant = action.payload;

            return;
        }

        case types.SET_STOCK: {
            state.stocks = action.payload;
            state.loadingStocks = false;

            return;
        }

        case types.LOADING:
            state.loading = true;
            return;

        case types.LOADING_STOCKS:
            state.loadingStocks = true;
            return;

        case types.CHANGE_SEARCH:
            state.search = action.payload;
            state.loading = true;
            return;

        case types.SEARCH_PRODUCTS:
            state.page = 1;
            state.total = action.payload.total;
            state.products = action.payload.products;
            state.loading = false;
            return;

        case types.LOAD_PRODUCTS:
            state.loading = false;
            state.total = action.payload.total;
            state.products = [...state.products, ...action.payload.products];

            return;

        case types.SELECT_PRODUCT:
            state.product = action.payload;
            return;

        default:
            return state;
    }
};

export default reducer;
