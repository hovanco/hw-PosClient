import React, { FC, useState } from 'react';

import { Typography, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form/Form';

interface Props {
    form: FormInstance;
}

const ChangePassword: FC<Props> = ({ form }) => {
    const [showForm, setShowForm] = useState<boolean>(false);

    const toggle = () => setShowForm(!showForm);

    const validateConfirmPassword = (rule: any, value: any, callback: any) => {
        if (value !== form.getFieldValue('newPassword')) {
            callback('Xác nhận mật khẩu không trùng khớp!');
        } else {
            callback();
        }
    };

    return (
        <>
            <Typography.Link onClick={toggle} className='change-password-trigger'>
                <PlusOutlined /> Thay đổi mật khẩu
            </Typography.Link>

            {showForm && (
                <>
                    <Form.Item
                        label='Mật khẩu cũ'
                        name='password'
                        rules={[{ required: true, message: 'Trường này không được để trống' }]}
                    >
                        <Input.Password placeholder='**********' />
                    </Form.Item>

                    <Form.Item
                        label='Mật khẩu mới'
                        name='newPassword'
                        rules={[{ required: true, message: 'Trường này không được để trống' }]}
                    >
                        <Input.Password placeholder='**********' />
                    </Form.Item>

                    <Form.Item
                        label='Xác nhận mật khẩu mới'
                        name='confirmNewPassword'
                        rules={[{ validator: validateConfirmPassword }]}
                    >
                        <Input.Password placeholder='**********' />
                    </Form.Item>
                </>
            )}
        </>
    );
};

export default ChangePassword;
