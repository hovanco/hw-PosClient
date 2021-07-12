import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import authApi from '../../../api/auth-api';
import { logout, updateUserSuccess } from '../../auth/state/auth-slide';

import { Form, Row, Col, Input, Divider, Space, Button, message } from 'antd';
import { Loading } from '../../../components';
import ChangePassword from './change-password';

const { updateUserInfo, changePassword } = authApi;

interface Props {
    toggleModal: () => void;
}

const FormSettingAccount: FC<Props> = ({ toggleModal }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch();

    // const validatePhone = (
    //     _: any,
    //     value: string,
    //     callback: (arg?: any) => void
    // ) => {
    //     const vnf_regex = /^(0|\+84)(9|3|7|8|5){1}([0-9]{8})$/g;

    //     if (value && vnf_regex.test(value) === false) {
    //         return callback('Vui lòng nhập số điên thoại hợp lệ');
    //     }

    //     return callback();
    // };

    const onSubmit = async (values: any) => {
        const { name, password, newPassword } = values;

        try {
            setLoading(true);

            if (name !== user.name) {
                await updateUserInfo({ name })
                    .then(() => {
                        dispatch(updateUserSuccess({ ...user, name }));
                        message.success('Cập nhật tài khoản thành công');
                        toggleModal();
                    })
                    .catch(() => {
                        message.error('Cập nhật tài khoản thất bại');
                    });
            }

            if (password || newPassword) {
                await changePassword({ currentPassword: password, newPassword })
                    .then(() => {
                        dispatch(logout());
                        message.success('Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại!');
                    })
                    .catch((error: any) => {
                        message.error('Cập nhật mật khẩu thất bại');

                        if (error.response.data.message === 'PASSWORD_INCORRECT')
                            form.setFields([
                                {
                                    name: 'password',
                                    errors: ['Mật khẩu không chính xác'],
                                },
                            ]);
                    });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading full />}
            <Form form={form} layout='vertical' initialValues={user} onFinish={onSubmit}>
                <Row gutter={20}>
                    {/* <Col span={12}>
                    <Form.Item label='Tên đăng nhập' name="email">
                        <Input placeholder='Tên đăng nhập' />
                    </Form.Item>
                </Col> */}

                    <Col span={12}>
                        <Form.Item
                            label='Tên đầy đủ'
                            name='name'
                            rules={[{ required: true, message: 'Trường này không được để trống' }]}
                        >
                            <Input placeholder='Tên đầy đủ' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label='Email' name='email'>
                            <Input placeholder='my-email@example.com' disabled />
                        </Form.Item>
                    </Col>

                    {/* <Col span={12}>
                    <Form.Item
                        label='Số điện thoại'
                        name='phone'
                        rules={[{ validator: validatePhone }]}
                    >
                        <Input placeholder='0905645457' />
                    </Form.Item>
                </Col> */}
                </Row>

                <Divider />

                <ChangePassword form={form} />

                <Divider />

                <Space size={15}>
                    <Button onClick={toggleModal}>Hủy</Button>
                    <Button htmlType='submit' type='primary'>
                        Cập nhật
                    </Button>
                </Space>
            </Form>
        </>
    );
};

export default FormSettingAccount;
