import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import React, { FC } from 'react';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { ProductState } from '../../pages/sales-counters/state/interface';

interface Props {
    product: ProductState;
    isEdit?: boolean;
    max?: number;
}

const ChangeCount: FC<Props> = ({ product, isEdit, max }) => {
    const { updateCount } = useSalesCounter();
    const onChangCount = (value: string | number | undefined) => {
        handleChangeCount(Number(value));
    };

    const removeCount = () => {
        handleChangeCount(product.count - 1);
    };

    const addCount = () => {
        if (max && max > product.count) {
            handleChangeCount(product.count + 1);
        }
    };

    const handleChangeCount = (count: number) => {
        const new_product = { ...product, count };
        updateCount(new_product);
    };

    if (!isEdit) return <span>{product.count}</span>;

    return (
        <Space size={3}>
            <Button
                type='text'
                icon={<MinusOutlined />}
                disabled={product.count === 1}
                onClick={removeCount}
            />
            <InputNumber
                value={product.count}
                onChange={onChangCount}
                min={1}
                max={max}
                style={{ width: 75, textAlign: 'center' }}
            />
            <Button
                type='text'
                icon={<PlusOutlined />}
                onClick={addCount}
                disabled={product.count === max}
            />
        </Space>
    );
};

export default ChangeCount;
