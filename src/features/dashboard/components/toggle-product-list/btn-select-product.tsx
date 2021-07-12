import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';
import { IProduct } from '../../../../collections/product';

interface Props {
    product: IProduct;
}

const BtnSelectProduct: FC<Props> = ({ product }) => {
    const onClick = () => {};
    return (
        <Button
            icon={<PlusCircleOutlined />}
            onClick={onClick}
            type='text'
            className='btn-select-product'
        />
    );
};

export default BtnSelectProduct;
