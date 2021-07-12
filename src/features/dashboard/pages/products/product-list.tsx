import { Col, Empty, Row } from 'antd';
import React, { FC, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../../../../components';
import ProductRow from './product-row';
import { useProduct } from './use-product';

const LIMIT = 20;

const ProductList: FC = () => {
    const {
        products,
        setLoading,
        getProducts,
        loading,
        selectProduct,
        total,
        page,
        setPage,
    } = useProduct();

    const loadMore = (numberPage: number) => {
        if (total && Math.ceil(total / LIMIT) >= numberPage) {
            setPage(numberPage);
        }
    };

    useEffect(() => {
        setLoading();
        getProducts({
            search: '',
            page: 1,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderListProduct = () => {
        if (loading) return <Loading />;

        if (products.length === 0)
            return (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Không tìm thấy sản phẩm' />
            );

        return (
            <InfiniteScroll
                pageStart={1}
                loadMore={loadMore}
                hasMore={total && page ? Math.ceil(total / LIMIT) > page : false}
                useWindow={false}
                initialLoad={false}
                isReverse={false}
                threshold={10}
            >
                {products.map((product: any, index: number) => (
                    <ProductRow
                        selectProduct={selectProduct}
                        product={product}
                        key={product._id}
                        isDark={index % 2 === 0}
                    />
                ))}

                {loading && <Loading />}
            </InfiniteScroll>
        );
    };

    return (
        <div className='product-list card-shadow'>
            <Row className='product-list-heading' style={{ overflowY: 'scroll' }}>
                <Col span={14} className='product-code'>
                    Mã sản phẩm
                </Col>
                <Col span={6} className='product-price'>
                    Giá tiền
                </Col>
                <Col span={4} className='product-quantity'>
                    Tồn kho
                </Col>
            </Row>

            <div className='product-list-body' style={{ flex: 1 }}>
                {renderListProduct()}
            </div>
        </div>
    );
};

export default ProductList;
