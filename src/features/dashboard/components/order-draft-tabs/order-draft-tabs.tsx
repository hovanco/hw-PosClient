import { Button, Row, Col, Space, Tooltip, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';
import { useOrdersDraft } from '../../pages/sales-counters/state/orders-draft-context';
import { OrderDraftBtn } from './order-draft-btn';

const OrderDraftTabs = () => {
    const scrollRef = useRef<any>();
    const { ordersDraft, addOrderDraft, orderIdDraftSelected, selectOrderDraft, closeOrderDraft } =
        useOrdersDraft();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 852;
        }
    }, [ordersDraft.length]);

    return (
        <Row gutter={10} justify='space-between'>
            <Col span={22}>
                <div style={{ overflowX: 'auto', scrollBehavior: 'smooth' }} ref={scrollRef}>
                    <Space>
                        {ordersDraft.map((order, index) => {
                            const handleSelectOrderDraft = () => {
                                selectOrderDraft(order.id);
                            };

                            const handleCloseOrderDraft = () => {
                                closeOrderDraft(order);
                            };

                            return (
                                <OrderDraftBtn
                                    key={order.id}
                                    active={order.id === orderIdDraftSelected}
                                    title={`Đơn ${index + 1}`}
                                    selectOrderDraft={handleSelectOrderDraft}
                                    closeOrderDraft={handleCloseOrderDraft}
                                    closeable={ordersDraft.length > 1}
                                />
                            );
                        })}
                    </Space>
                </div>
            </Col>

            <Col>
                <Tooltip title='Đơn hàng mới' placement='bottom'>
                    <Button icon={<PlusCircleOutlined />} onClick={addOrderDraft}></Button>
                </Tooltip>
            </Col>
        </Row>
    );
};

export { OrderDraftTabs };
