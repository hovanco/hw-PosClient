import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import AddCustomer from '../add-customer';
import SearchCustomer from './search-customer';

interface Props {}

const CardSearchCustomer = (props: Props) => {
    const { isRestrictAction } = useSalesCounter(); 

    return (
        <Card bodyStyle={{ padding: '16px 24px', background: '#f6f8f8' }} className='card-shadow'>
            <Row style={{ marginBottom: 15 }} justify='space-between' align='middle'>
                <Col>
                    <div className='title-card'>
                        <span>Khách hàng</span>
                    </div>
                </Col>
            </Row>

            <Row gutter={16} justify='space-between' align='middle'>
                <Col style={{ flex: 1 }}>
                    <SearchCustomer />
                </Col>
                <Col>
                    <AddCustomer>
                        <Button
                            type='primary'
                            icon={<PlusCircleOutlined />}
                            disabled={isRestrictAction}
                        />
                    </AddCustomer>
                </Col>
            </Row>
        </Card>
    );
};

export default CardSearchCustomer;
