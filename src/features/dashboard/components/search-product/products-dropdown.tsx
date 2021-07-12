import { Empty } from 'antd';
import React, { FC, useMemo } from 'react';
import { IProduct } from '../../../../collections/product';
import { Loading } from '../../../../components';
import { ProductState } from '../../pages/sales-counters/state/interface';
import { useSearchProduct } from './context';
import ProductRow from './product-row';

const NoProduct: FC = () => {
    return (
        <div className='no-products'>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Không có sản phẩm' />
        </div>
    );
};

interface Props {
    loading: boolean;
    products: IProduct[];
    setHideVisible?: () => void;
    productRowRender?: any;
}

const ProductsDropdown: FC<Props> = ({ products, loading, setHideVisible, productRowRender }) => {
    const { selectProduct } = useSearchProduct();

    const handleAddProduct = (product: ProductState) => {
        selectProduct(product);
        if (setHideVisible) setHideVisible();
    };

    const ProductRowRender = useMemo(() => {
        if (productRowRender) return productRowRender;

        return ProductRow;
    }, [productRowRender]);

    const renderProducts = () => {
        if (products.length === 0) return <NoProduct />;
        return products.map((product) => (
            <ProductRowRender
                key={product._id}
                product={product}
                selectProduct={handleAddProduct}
            />
        ));
    };

    return (
        <div className='products-dropdown'>
            {loading && <Loading full />}

            {renderProducts()}
        </div>
    );
};

export default ProductsDropdown;
