import { Col, Row, Space } from 'antd';
import React, { FC, ReactNode } from 'react';
import './item-row.less';

interface Props {
    label: string | ReactNode;
    children?: ReactNode;
    icon?: ReactNode;
    colLabel?: number;
    colChildren?: number;
}

const ItemRow: FC<Props> = ({ icon, label, children, colLabel = 9, colChildren = 14 }) => {
    return (
        <Row gutter={[10, 5]} className='item-row'>
            <Col span={colLabel}>
                <Space size={10}>
                    {icon}
                    <span className='label'>{label}</span>
                </Space>
            </Col>
            <Col span={1}>:</Col>
            <Col span={colChildren}>{children || '---'}</Col>
        </Row>
    );
};

export default ItemRow;
