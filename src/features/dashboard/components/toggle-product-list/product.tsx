import { EllipsisOutlined, PictureFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import cls from 'classnames';
import _ from 'lodash';
import React, { FC, memo } from 'react';
import { IProduct } from '../../../../collections/product';
import { TextEllipsis } from '../../../../components';
import constants from '../../../../constants';
import useVisble from '../../../../hook/useVisible';
import ProductVariant from './product-variant';

interface Props {
    product: IProduct;
}

const Product: FC<Props> = ({ product }) => {
    const { visible, toggle } = useVisble();

    const isHasVariant = product.variants && product.variants.length > 0;
    const outOfStock = _.get(product, 'quantity', 0) === 0 && !isHasVariant;

    const onClick = () => {
        if (!outOfStock) {
            toggle();
        }
    };

    const img =
        product.images.length > 0 ? (
            <img src={`${constants.URL_IMG}${product.images[0]}`} alt={product.name} />
        ) : (
            <span className='icon'>
                <PictureFilled style={{ fontSize: 30, color: '#ddd' }} />
            </span>
        );

    const renderModal = (
        <Modal
            visible={visible}
            onCancel={toggle}
            footer={false}
            width={650}
            title={
                <div className='title-custom'>
                    <span>{product.name}</span>
                </div>
            }
            bodyStyle={{ padding: 0 }}
            className='modal-custom'
        >
            <ProductVariant product={product} />
        </Modal>
    );

    const renderVariantBtn = isHasVariant && (
        <div className='product-more'>
            <Button size='small' type='primary' icon={<EllipsisOutlined />}></Button>
        </div>
    );

    return (
        <>
            <div
                className={cls('product-card', {
                    outOfStock,
                })}
                onClick={onClick}
            >
                <div className='product-image'>{img}</div>

                <div className='product-name'>
                    <TextEllipsis width='100%'>{product.name}</TextEllipsis>
                </div>

                {renderVariantBtn}
            </div>

            {renderModal}
        </>
    );
};

export default memo(Product);
