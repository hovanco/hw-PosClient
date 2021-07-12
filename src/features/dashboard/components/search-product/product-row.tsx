import { ExclamationCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Modal, Row, Space } from 'antd';
import classNames from 'classnames';
import React, { FC } from 'react';
import { IProduct, ProductAttribute } from '../../../../collections/product';
import constants from '../../../../constants';
import useVisble from '../../../../hook/useVisible';
import formatMoney from '../../../../utils/formatMoney';
import ProductGeneralInfo from '../../pages/products/product-general-info';
import TableStock from '../../pages/products/table-stock';
import { useProduct } from '../../pages/products/use-product';
import { ProductState } from '../../pages/sales-counters/state/interface';

interface Props {
    product: IProduct;
    selectProduct: (product: ProductState) => void;
}

const ProductRow: FC<Props> = ({ product, selectProduct }) => {
    const { visible, toggle } = useVisble();
    const { selectProduct: viewDetailProduct } = useProduct();

    const handleOnClick = () => {
        if (!product.quantity || product.quantity === 0) {
            return;
        }
        selectProduct({ ...product, count: 1 });
    };

    const handleToggle = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        toggle();
    };
    const handleViewDetail = async (e: { stopPropagation: () => void }) => {
        handleToggle(e);
        viewDetailProduct(product);
    };

    const renderModal = (
        <Modal
            width='90%'
            visible={visible}
            onCancel={handleToggle}
            footer={false}
            title={
                <div className='title-custom'>
                    <span>{product.name}</span>
                </div>
            }
            bodyStyle={{ padding: 0 }}
            className='modal-custom'
        >
            <Space style={{ width: '100%' }} size={18} direction='vertical'>
                <ProductGeneralInfo />
                <TableStock />
            </Space>
        </Modal>
    );

    return (
        <div
            tabIndex={0}
            className={classNames('product-row', {
                disabled: !product.quantity || product.quantity === 0,
            })}
            onClick={handleOnClick}
        >
            <Row justify='space-between' align='middle' gutter={15}>
                <Col flex={3} style={{ width: 70, textAlign: 'center' }}>
                    {product.code || '---'}
                </Col>
                <Col flex={3} style={{ width: 200 }}>
                    <Space size={10}>
                        <Avatar
                            shape='square'
                            size={46}
                            src={
                                product.images?.length > 0
                                    ? `${constants.URL_IMG}${product.images[0]}`
                                    : undefined
                            }
                            icon={<PictureOutlined />}
                        />
                        <div>
                            <div>{product.name}</div>
                            <div className='primary-text'>
                                {product.attributes
                                    ?.map((attr: ProductAttribute) => attr.tags)
                                    ?.join(' - ')}
                            </div>
                        </div>
                    </Space>
                </Col>
                <Col flex={3}>{formatMoney(product.price)} đ</Col>
                <Col flex={3}>Tồn kho: {formatMoney(product.quantity) || 0}</Col>

                <Col flex={3} style={{ textAlign: 'right' }}>
                    <Button
                        size='small'
                        icon={<ExclamationCircleOutlined />}
                        onClick={handleViewDetail}
                    >
                        Chi tiết
                    </Button>
                </Col>
            </Row>
            {renderModal}
        </div>
    );
};

export default ProductRow;
