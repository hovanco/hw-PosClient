import React, { FC, ReactNode } from 'react';
import './cirle.less';

interface Props {
    children: ReactNode;
    size?: number;
}

const Cirle: FC<Props> = ({ children, size = 24 }) => (
    <span
        style={{
            height: size,
            width: size,
            borderRadius: size / 2,
            background: '#307dd2',
        }}
        className='cirle'
    >
        {children}
    </span>
);

export default Cirle;
