import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../../../api/category-api';
import storeApi from '../../../api/store-api';
import warehouseApi from '../../../api/warehouse-api';
import { ICategory } from '../../../collections/category';
import { ESaleChannel } from '../../../collections/sale-channel';
import { IStore } from '../../../collections/store';
import { IWarehouse } from '../../../collections/warehouse';

interface IStoreState {
    loading: boolean;
    store: IStore;
    warehouseId: string;
    warehouses: IWarehouse[];
    loadingWarehouse: boolean;
    categories: ICategory[];
}

const storeSlide = createSlice({
    name: 'store',
    initialState: {
        loading: true,
        store: null,
        warehouseId: null,
        warehouses: [],
        loadingWarehouse: false,
        categories: [],
    },

    reducers: {
        loadStoreStart(state) {
            state.loading = true;
        },
        loadStoreSuccess(state, action) {
            state.loading = false;
            state.store = action.payload;
            state.warehouseId = action.payload._id;
        },
        loadStoreFailed(state) {
            state.loading = false;
            state.store = null;
        },
        selectWarehouse(state, action) {
            state.warehouseId = action.payload;
        },
        loadWarehouseStart(state) {
            state.loadingWarehouse = true;
        },
        loadWarehouseSuccess(state, action) {
            state.warehouses = action.payload;
            state.loadingWarehouse = false;
        },
        loadWarehouseFailed(state) {
            state.warehouses = [];
            state.loadingWarehouse = false;
        },
        loadCategoriesDone(state, action) {
            state.categories = action.payload;
        },
    },
});

const { actions, reducer } = storeSlide;

export const {
    loadStoreStart,
    loadStoreSuccess,
    loadStoreFailed,
    selectWarehouse,
    loadWarehouseSuccess,
    loadWarehouseFailed,
    loadCategoriesDone,
} = actions;

export const loadStore = () => async (dispatch: any) => {
    try {
        dispatch(loadStoreStart());

        let response = await storeApi.loadStore();

        if (!(response.saleChannels || []).includes(ESaleChannel.POS)) {
            let newSaleChannels = response.saleChannels
                ? [...response.saleChannels, ESaleChannel.POS]
                : [ESaleChannel.POS];

            response.saleChannels = newSaleChannels;
            await storeApi.updateStore(response._id as string, {
                saleChannels: newSaleChannels,
            });
        }

        dispatch(loadStoreSuccess(response));
    } catch (error) {
        dispatch(loadStoreFailed());
    }
};

export const loadWarehouse = () => async (dispatch: any, getState: any) => {
    try {
        let store = getState().store.store;
        const response = await warehouseApi.loadWarehouse({ storeId: store._id });

        dispatch(loadWarehouseSuccess(response.data));
    } catch (error) {
        dispatch(loadWarehouseFailed());
    }
};

export const loadCategories = () => async (dispatch: any, getState: any) => {
    try {
        const store = getState().store.store;

        const response = await getCategories({
            storeId: store._id,
            page: 1,
            limit: 20,
        });

        dispatch(loadCategoriesDone(response));
    } catch (error) {
        dispatch(loadCategoriesDone([]));
    }
};

export default reducer;
