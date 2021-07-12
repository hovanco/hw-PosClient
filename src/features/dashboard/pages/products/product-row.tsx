import _ from 'lodash';
import { PictureOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Space } from 'antd';
import React, { FC } from 'react';
import clx from 'classnames';
import { IProduct, ProductAttribute } from '../../../../collections/product';
import constants from '../../../../constants';
import formatMoney from '../../../../utils/formatMoney';
import { useProduct } from './use-product';

interface Props {
    product: IProduct;
    selectProduct: (product: IProduct) => void;
    isDark?: boolean;
}

const ProductRow: FC<Props> = ({ product, selectProduct, isDark }) => {
    const { product: productSelected, getDetailProduct } = useProduct();

    const handleSelectProduct = async () => {
        if (product.isVariant && product.attributes.length > 0) {
            const dataDetail = await getDetailProduct(product._id);
            const description = _.get(dataDetail, 'parentId.description', '');
            selectProduct({ ...product, description });
        } else {
            selectProduct(product);
        }
    }

    return (
        <Row
            className={clx('variant-row', {
                isDark,
                selected: productSelected?._id === product?._id,
            })}
            align='middle'
            onClick={handleSelectProduct}
            justify='space-between'
            gutter={[0, 8]}
        >
            <Col span={14} className='product-code'>
                <Space size={12}>
                    <Avatar
                        size={46}
                        src={
                            product.images.length > 0
                                ? `${constants.URL_IMG}${product.images[0]}`
                                : undefined
                        }
                        shape='square'
                        icon={<PictureOutlined />}
                    />

                    <Space size={5} direction='vertical'>
                        <div>
                            {product.name}{' '}
                            {product.attributes
                                ?.map((attr: ProductAttribute) => attr.tags)
                                ?.join(' - ')}
                        </div>
                        <div>SKU: {product.sku || product.code}</div>
                    </Space>
                </Space>
            </Col>
            <Col span={6} className='product-price'>
                {formatMoney(product.price)} đ
            </Col>
            <Col span={4} className='product-quantity'>
                {formatMoney(product.quantity) || 0}
            </Col>
        </Row>
    );
};
export default ProductRow;
