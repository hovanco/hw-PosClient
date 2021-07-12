import { useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';

import types from './reducer/type';
import { Product, IProduct, IStock } from '../../../../collections/product';
import { IWarehouse } from '../../../../collections/warehouse';
import { ProductState } from '../../pages/sales-counters/state/interface';
import productApi from '../../../../api/product-api';
import * as stockApi from '../../../../api/stock-api';

import { ProductContext } from './context';

const findWarehouseById = (warehouseId: string, warehouses: IWarehouse[]) => {
    return warehouses.find((warehouse: IWarehouse) => warehouse._id === warehouseId) || warehouseId;
};

const mapStockWithWarehouse = (stocks: IStock[], warehouses: IWarehouse[]) => {
    return stocks.map((stock: IStock) => ({
        ...stock,
        warehouseId: findWarehouseById(stock.warehouseId, warehouses),
    }));
};

export const useProduct = () => {
    const value = useContext(ProductContext);
    const store = useSelector((state: any) => state.store.store);
    const warehouseId = useSelector((state: any) => state.store.warehouseId);
    const warehouses = useSelector((state: any) => state.store.warehouses);

    const { state, dispatch } = value;

    const setLoading = () => {
        dispatch({
            type: types.LOADING,
        });
    };

    const setLoadingStocks = () => {
        dispatch({
            type: types.LOADING_STOCKS,
        });
    };

    const searchProducts = async (text: string) => {
        await dispatch({
            type: types.CHANGE_SEARCH,
            payload: text,
        });

        await getProducts({
            search: text,
            type: 'search',
            page: 1,
        });
    };

    const getDetailProduct = (productId: string) => {
        return productApi.getProduct({
            storeId: store._id,
            productId,
        });
    };

    const getProducts = async ({
        search,
        page,
        type,
    }: {
        search?: string;
        page: number;
        type?: string;
    }) => {
        try {
            const response = await productApi.getProducts({
                storeId: store._id,
                page,
                limit: 20,
                search,
                warehouseId,
                withQuantity: true,
                variant: true,
            });

            const typeAction = type === 'search' ? types.SEARCH_PRODUCTS : types.LOAD_PRODUCTS;

            dispatch({
                type: typeAction,
                payload: {
                    products: response.data,
                    total: response.total,
                },
            });
        } catch (error) {
            dispatch({
                type: types.LOAD_PRODUCTS,
                payload: [],
            });
        }
    };

    const selectProduct = (productSelected: any) => {
        setLoadingStocks();
        stockApi
            .getStocks({ storeId: store._id, productId: productSelected._id })
            .then((response: any) => {
                const { data } = response;

                const stocks = mapStockWithWarehouse(data, warehouses);
                dispatch({
                    type: types.SET_STOCK,
                    payload: stocks,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.SET_STOCK,
                    payload: [],
                });
            });
        dispatch({
            type: types.SELECT_PRODUCT,
            payload: productSelected,
        });
    };

    const setPage = async (page: number) => {
        await dispatch({
            type: types.SET_PAGE,
            payload: page,
        });

        await getProducts({
            search: state.search,
            page: page,
        });
    };

    const setProduct = useCallback(
        (product: ProductState) => {
            productApi
                .getProduct({ storeId: store._id, productId: product._id })
                .then((product: IProduct) => {
                    dispatch({
                        type: types.SET_PRODUCT,
                        payload: product,
                    });

                    if (product.variants && product.variants.length) {
                        setVariant(product.variants[0]);
                    }
                })
                .catch(() => {
                    dispatch({
                        type: types.SET_PRODUCT,
                        payload: undefined,
                    });
                });

            setLoadingStocks();
            stockApi
                .getStocks({ storeId: store._id, parentId: product._id })
                .then((response: any) => {
                    const { data } = response;

                    const stocks = mapStockWithWarehouse(data, warehouses);

                    dispatch({
                        type: types.SET_STOCK,
                        payload: stocks,
                    });
                })
                .catch(() => {
                    dispatch({
                        type: types.SET_STOCK,
                        payload: [],
                    });
                });

            // eslint-disable-next-line
        },
        [warehouses, store._id]
    );

    const getVariantQuantity = useCallback(
        (variantId: string) => {
            if (state.stocks.length === 0) return 0;

            let targetStocks = state.stocks.filter(
                (item: IStock) => item.productId._id === variantId
            );

            return targetStocks.reduce(
                (prevValue: number, currValue: IStock) => prevValue + currValue.quantity,
                0
            );
        },

        // eslint-disable-next-line
        [state.stocks]
    );

    const setVariant = useCallback(
        (variant: Product) => {
            dispatch({
                type: types.SET_VARIANT,
                payload: variant,
            });

            // eslint-disable-next-line
        },
        [warehouses]
    );

    const getStocksByVariantId = useCallback(
        (variantId?: string) => {
            if (state.stocks.length === 0 || !variantId) return [];

            let targetStocks = state.stocks.filter(
                (item: IStock) => item.productId._id === variantId
            );

            return targetStocks;
        },
        [state.stocks]
    );

    return {
        ...state,
        setProduct,
        getVariantQuantity,
        setVariant,
        getStocksByVariantId,
        setLoading,
        searchProducts,
        selectProduct,
        setPage,
        getProducts,
        getDetailProduct,
    };
};
