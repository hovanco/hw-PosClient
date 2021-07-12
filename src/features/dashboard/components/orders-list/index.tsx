import { Col, Empty, Row } from 'antd';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../../../../components';
import { useOrders } from '../../pages/order/state';
import './order-list.less';
import OrderRow from './order-row';

interface Props {}

const LIMIT = 20;

const OrdersList = (props: Props) => {
    const { orders, setLoading, getOrders, loading, selectOrder, total, page, setPage } =
        useOrders();

    const loadMore = (numberPage: number) => {
        if (Math.ceil(total / LIMIT) >= numberPage) {
            setPage(numberPage);
        }
    };

    useEffect(() => {
        setLoading();
        getOrders({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderListOrder = () => {
        if (loading) return <Loading />;

        if (orders.length === 0)
            return (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Không tìm thấy đơn hàng' />
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
                {orders.map((order: any, index: number) => (
                    <OrderRow
                        selectOrder={selectOrder}
                        order={order}
                        key={order._id}
                        isDark={index % 2 === 0}
                    />
                ))}

                {loading && <Loading />}
            </InfiniteScroll>
        );
    };

    return (
        <div className='order-list card-shadow'>
            <Row className='order-list-heading' style={{ overflowY: 'scroll' }}>
                <Col className='order-code'>Mã đơn hàng</Col>
                <Col className='order-status' style={{ textAlign: 'center' }}>
                    Trạng thái
                </Col>
                <Col className='paid-status' style={{ textAlign: 'center' }}>
                    Trạng thái thanh toán
                </Col>
                <Col className='order-price' style={{ textAlign: 'right' }} flex={3}>
                    Tổng giá
                </Col>
            </Row>

            <div className='order-list-body' style={{ flex: 1 }}>
                {renderListOrder()}
            </div>
        </div>
    );
};

export default OrdersList;
