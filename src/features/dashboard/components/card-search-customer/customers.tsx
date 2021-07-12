import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Empty, Space } from 'antd';
import React, { FC } from 'react';
import { ICustomer } from '../../../../collections/customer';
import { Loading } from '../../../../components';
import { guest } from '../../../../constants/guest';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import AddCustomer from '../add-customer';
import CustomerRow from './customer-row';

interface Props {
    loading: boolean;
    customers: ICustomer[];
    setHideVisible?: () => void;
    optionGuest: boolean;
}

const Customers: FC<Props> = ({ loading, customers, optionGuest, setHideVisible }) => {
    const { addCustomer, isRestrictAction } = useSalesCounter();

    const selectCustomer = (customer: ICustomer) => {
        if (setHideVisible) {
            setHideVisible();
        }

        addCustomer(customer);
    };

    const renderCustomes =
        customers.length > 0 ? (
            customers.map((customer: ICustomer) => (
                <CustomerRow
                    key={customer._id}
                    customer={customer}
                    selectCustomer={selectCustomer}
                />
            ))
        ) : (
            <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Không có khách hàng' />
            </div>
        );

    return (
        <div className={'custome-list-wrap'}>
            <div className='customers-list'>
                {loading && <Loading />}

                {optionGuest && <div onClick={() => selectCustomer(guest)} className="customer-row">
                    <Space size={15}>
                        <Avatar size={30} icon={<UserOutlined />} className='avatar' />
                        <div className='customer-name'>Khách vãng lai</div>
                    </Space>
                </div>}

                {renderCustomes}

                <div className='add-customer'>
                    <AddCustomer>
                        <Button
                            type='primary'
                            size='small'
                            style={{ width: 170 }}
                            disabled={isRestrictAction}
                        >
                            Thêm khách hàng
                        </Button>
                    </AddCustomer>
                </div>
            </div>
        </div>
    );
};

export default Customers;
