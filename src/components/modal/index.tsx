import React, { FC, ReactNode } from 'react';
import { Modal as ModalAnt } from 'antd';

interface Props {
    children: ReactNode;
    title: string;
    visible: boolean;
}

const Modal: FC<Props> = ({ children, title, visible, ...otherProps }) => {
    const headerTitle = (
        <div>
            <span className='title-text'>{title}</span>
        </div>
    );
    return (
        <ModalAnt {...otherProps} visible={visible} title={headerTitle}>
            {children}
        </ModalAnt>
    );
};

export default Modal;
