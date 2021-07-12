import { CloseCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import cls from 'classnames';
import React, { FC } from 'react';

interface Props {
    active?: boolean;
    title: string;
    selectOrderDraft: () => void;
    closeOrderDraft: () => void;
    closeable?: boolean;
    width?: string | number;
}

const OrderDraftBtn: FC<Props> = ({
    active = false,
    title,
    selectOrderDraft,
    closeOrderDraft,
    closeable = true,
    width = 'auto',
}) => {
    const className = cls('ant-btn', { 'ant-btn-primary': active });
    const styleIcon = {
        color: active ? '#fff' : 'inherit',
    };

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
                width,
                marginRight: 5,
            }}
        >
            <span
                className={className}
                style={{ paddingRight: 30, width: '100%' }}
                onClick={selectOrderDraft}
            >
                {title}
            </span>
            {closeable && (
                <Tooltip title='Đóng' placement='bottom'>
                    <span
                        style={{
                            position: 'absolute',
                            right: 7,
                            top: '50%',
                            marginTop: -11,
                            cursor: 'pointer',
                        }}
                        onClick={closeOrderDraft}
                    >
                        <CloseCircleOutlined className='close-tab' style={{ ...styleIcon }} />
                    </span>
                </Tooltip>
            )}
        </div>
    );
};

export { OrderDraftBtn };
