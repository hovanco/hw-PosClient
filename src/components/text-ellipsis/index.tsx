import React, { FC, ReactNode } from 'react';
import './text-ellipsis.less';

interface Props {
    children: ReactNode;
    width: string | number;
}

const TextEllipsis: FC<Props> = ({ children, width }) => {
    return (
        <span className='text-ellipsis' style={{ width }}>
            {children}
        </span>
    );
};

export default TextEllipsis;
