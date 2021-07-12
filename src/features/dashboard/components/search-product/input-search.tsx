import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { FC, useRef } from 'react';
import useKey from '../../../../hook/useKey';

interface Props {
    onChange: (text: string) => void;
    setFocus?: () => void;
}
const InputSearch: FC<Props> = ({ onChange, setFocus }) => {
    const inputRef = useRef<any>();

    const focusInput = () => {
        inputRef.current.focus();
        if (setFocus) setFocus();
    };

    useKey({
        key: 'F2',
        callback: focusInput,
    });

    return (
        <Input
            ref={inputRef}
            placeholder='Nhập tên sản phẩm / Quét Barcode (F2)'
            prefix={<SearchOutlined />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            onFocus={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            allowClear
        />
    );
};

export default InputSearch;
