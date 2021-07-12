import { Card, Checkbox, Col, Input, Row, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { EUserRole } from '../../../../collections/staff';
import useStaffs from '../../../../hook/useStaffs';
import { useSalesCounter } from '../../pages/sales-counters/state/context';

interface Props {}

const SelectStaff: FC = () => {
    const store = useSelector((state: any) => state.store.store);
    const user = useSelector((state: any) => state.auth.user);
    const { loading, staffs } = useStaffs();

    const isStaff = typeof store.role === 'undefined' || store.role === EUserRole.staff;

    const renderContent = isStaff ? (
        <Input
            style={{ width: 'calc(100% - 86px)', background: '#fff', color: '#000' }}
            defaultValue={user.name}
            disabled
        />
    ) : (
        <Select style={{ width: 'calc(100% - 86px)' }} loading={loading} defaultValue={user._id}>
            {staffs.map((staff) => (
                <Select.Option value={staff._id} key={staff._id}>
                    {staff.name}
                </Select.Option>
            ))}
        </Select>
    );
    return (
        <Input.Group compact>
            <Input style={{ width: 86, color: '#000' }} defaultValue='Nhân viên' disabled />

            {renderContent}
        </Input.Group>
    );
};

const CardStaff = (props: Props) => {
    const { customerNote, addCustomerNote, delivered, changeDelivered, sale } = useSalesCounter();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        addCustomerNote(e.target.value);
    };

    const handleChangeDelivered = (e: CheckboxChangeEvent) => {
        changeDelivered(e.target.checked);
    };

    return (
        <Card className='card-shadow' bodyStyle={{ padding: '16px 24px' }}>
            <Row gutter={15}>
                <Col span={8}>
                    <SelectStaff />
                </Col>
                <Col span={8}>
                    <Input addonBefore='Nhập ghi chú' onChange={onChange} value={customerNote} />
                </Col>
                <Col span={8}>
                    <Row align='middle' style={{ height: '100%' }}>
                        <Col span={12}>
                            <Checkbox checked={sale}>Thanh toán</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox checked={delivered} onChange={handleChangeDelivered}>
                                Đã giao hàng
                            </Checkbox>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default CardStaff;
