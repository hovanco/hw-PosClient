import className from 'classnames';
import { join } from 'lodash';
import React, { FC } from 'react';
import { Product, ProductAttribute } from '../../../../collections/product';
import { useSalesCounter } from '../../pages/sales-counters/state/context';

interface Props {
    variant: Product;
}

const VariantItem: FC<Props> = ({ variant }) => {
    const { addProduct } = useSalesCounter();

    const disabled = !variant.quantity || variant.quantity === 0;

    const handleOnClick = () => {
        if (!disabled) {
            addProduct({ ...variant, count: 1 });
        }
    };

    const name_attributes: string[] = variant.attributes.map((attribute: ProductAttribute) => {
        return attribute.tags[0];
    });

    return (
        <div className={className('variant', { disabled })} onClick={handleOnClick}>
            <div>{join(name_attributes, '-')}</div>
            <div>Tồn: {variant.quantity}</div>
        </div>
    );
};

export default VariantItem;
