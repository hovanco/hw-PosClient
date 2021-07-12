import { Card } from 'antd';
import React from 'react';
import ProductsSelect from '../products-select';
import ToggleProductList from '../toggle-product-list';

interface Props {}

const CardProductsSelect = (props: Props) => {
    return (
        <Card
            className='card-custom card-shadow'
            bodyStyle={{
                padding: 0,
            }}
            style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
        >
            <ProductsSelect />

            <ToggleProductList />
        </Card>
    );
};

export default CardProductsSelect;
