import { CalendarOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import useVisble from '../../../../hook/useVisible';
import { useOrders } from '../../pages/order/state';
import SelectDateModal from './select-date-modal';

import './select-date.less';

interface Props {}

const SelectDate: FC<Props> = () => {
    const { time, typeTime } = useOrders();
    const { visible, toggle } = useVisble();

    const renderTitle = () => {
        if (!time) return 'Chọn thời gian';

        if (typeTime === 'month') return `Tháng ${moment(time).format('MM/YYYY')}`;
        if (typeTime === 'date') return `Ngày ${moment(time).format('DD/MM/YYYY')}`;

        return `Ngày ${moment(time[0]).format('DD/MM/YYYY')} - ${moment(time[1]).format('DD/MM/YYYY')}`;
    };

    return (
        <>
            <div onClick={toggle} className='select-date'>
                <Space>
                    {renderTitle()}
                    <CalendarOutlined />
                </Space>
            </div>

            <SelectDateModal visible={visible} toggle={toggle} />
        </>
    );
};

export default SelectDate;
