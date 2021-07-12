import { debounce } from 'lodash';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import productApi from '../../../../api/product-api';
import { IProduct } from '../../../../collections/product';
import SearchDropdown from '../../../../components/search-dropdown';
import { ProductProvider } from '../../pages/products/context';
import { ProductState } from '../../pages/sales-counters/state/interface';
import ProviderContext from './context';
import InputSearch from './input-search';
import ProductsDropdown from './products-dropdown';
import './search-product.less';

interface Props {
    selectProduct: (product: ProductState) => void;
    productRowRender?: any;
}

const SearchProduct: FC<Props> = ({ selectProduct, productRowRender }) => {
    const store = useSelector((state: any) => state.store.store);
    const warehouseId = useSelector((state: any) => state.store.warehouseId);

    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<IProduct[]>([]);

    const inputRef = useRef<any>();

    const focusInput = useCallback((e: any) => {
        if (e.code === 'F2' && inputRef.current) {
            return inputRef.current.focus();
        }
        return null;
    }, []);

    const onChange = debounce((text_string?: string) => {
        setLoading(true);

        productApi
            .getProducts({
                storeId: store._id,
                page: 1,
                limit: 20,
                search: text_string,
                warehouseId,
                withQuantity: true,
                variant: true,
            })
            .then((response: any) => {
                setProducts(response?.data || []);
            })
            .catch(() => {
                setProducts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, 300);

    const handleSelectProduct = (product: ProductState) => {
        selectProduct(product);
    };

    useEffect(() => {
        onChange();
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', focusInput);

        return () => {
            document.removeEventListener('keydown', focusInput);
        };
    }, [focusInput]);

    return (
        <ProviderContext selectProduct={handleSelectProduct}>
            <ProductProvider>
                <SearchDropdown
                    className='search-product'
                    input={<InputSearch onChange={onChange} />}
                >
                    <ProductsDropdown
                        products={products}
                        loading={loading}
                        productRowRender={productRowRender}
                    />
                </SearchDropdown>
            </ProductProvider>
        </ProviderContext>
    );
};

export default SearchProduct;
