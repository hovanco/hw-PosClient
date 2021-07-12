import { Card, Typography } from 'antd';
import { debounce } from 'lodash';
import React, { FC } from 'react';
import InputSearch from '../../components/search-product/input-search';
import { useProduct } from './use-product';

const SearchProductBox: FC = () => {
    const { searchProducts } = useProduct();

    const handleChange = debounce((text: string) => {
        searchProducts(text);
    }, 300);

    return (
        <Card className='card-shadow search-product-box' style={{ background: '#f6f8f8' }}>
            <Typography.Title level={3}>Sản phẩm</Typography.Title>

            <div className='search-product'>
                <InputSearch onChange={handleChange} />
            </div>
        </Card>
    );
};

export default SearchProductBox;
