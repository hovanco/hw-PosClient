import { Button, Col, DatePicker, Modal, Row } from 'antd';
import React, { FC, useState } from 'react';
import { useOrders } from '../../pages/order/state';
const { RangePicker } = DatePicker;

interface Props {
    visible: boolean;
    toggle: () => void;
}

const SelectDateModal: FC<Props> = ({ visible, toggle }) => {
    const { selectTime } = useOrders();

    const [time, setTime] = useState<string | string[]>();

    const onChangeTime = (value: any) => {
        setTime(value);
    };

    const selectDate = () => {
        selectTime({
            time,
            typeTime: 'custom',
        });
        toggle();
    };

    const handleCancel = () => {
        selectTime({});
        toggle();
    };

    const renderSelectDate = () => {
        return <RangePicker onChange={onChangeTime} style={{ width: '100%' }} />;
    };

    return (
        <Modal visible={visible} onCancel={handleCancel} title='Chọn thời gian' footer={null}>
            <Row gutter={15}>
                <Col flex={1}>{renderSelectDate()}</Col>
                <Col>
                    <Button type='primary' disabled={!time} onClick={selectDate}>
                        Tìm kiếm
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};

export default SelectDateModal;
