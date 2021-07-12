import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { ProductState } from '../../pages/sales-counters/state/interface';

interface Props {
    product: ProductState;
}

const ProductRemoveBtn: FC<Props> = ({ product }) => {
    const { removeProduct } = useSalesCounter();
    const onClick = () => {
        removeProduct(product);
    };

    return (
        <Button type='text' onClick={onClick} className='btn-remove-product'>
            <CloseCircleOutlined />
        </Button>
    );
};

export default ProductRemoveBtn;
