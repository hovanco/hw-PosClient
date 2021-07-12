import { SearchOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row } from 'antd';
import { debounce } from 'lodash';
import React, { FC } from 'react';
import { useOrders } from '../../pages/order/state';
import SelectDate from '../select-date';
import './search-order.less';

interface Props {}

const SearchOrder: FC<Props> = () => {
    const { searchOrders } = useOrders();

    const handleChange = debounce((text: string) => {
        searchOrders(text);
    }, 300);

    return (
        <Card className='card-shadow' style={{ background: '#f6f8f8' }}>
            <Row align='middle' justify='space-between' style={{ marginBottom: 10 }}>
                <Col>
                    <div className='title-card'>
                        <span>Đơn hàng</span>
                    </div>
                </Col>
                <Col>
                    <SelectDate />
                </Col>
            </Row>

            <div className='search-order'>
                <Input
                    className='search-order-input'
                    allowClear
                    placeholder='Nhập mã đơn hàng'
                    prefix={<SearchOutlined />}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e.target.value)
                    }
                />
            </div>
        </Card>
    );
};

export default SearchOrder;
