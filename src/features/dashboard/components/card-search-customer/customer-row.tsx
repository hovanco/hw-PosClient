import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import React, { FC, memo } from 'react';
import { ICustomer } from '../../../../collections/customer';

interface Props {
    customer: ICustomer;
    selectCustomer: (customer: ICustomer) => void;
}

const CustomerRow: FC<Props> = ({ customer, selectCustomer }) => {
    const onClick = () => {
        selectCustomer(customer);
    };

    return (
        <div onClick={onClick} className='customer-row'>
            <Space size={15}>
                <Avatar size={30} icon={<UserOutlined />} className='avatar' />
                <div>
                    <div className='customer-name'>{customer.name}</div>
                    <div className='customer-phoneNo'>{customer.phoneNo}</div>
                </div>
            </Space>
        </div>
    );
};

export default memo(CustomerRow);
