import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import TextArea from 'antd/lib/input/TextArea';
import { map } from 'lodash';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import customerApi from '../../../../api/customer-api';
import { ICustomer } from '../../../../collections/customer';
import useLoading from '../../../../hook/useLoading';
import { disabledAutosuggestion } from '../../../../utils';
import { useSalesCounter } from '../../pages/sales-counters/state/context';
import { useDistricts, useProvices, useWards } from './hook';
import { District, Province, Ward } from './interface';

interface Props {
    toggle?: () => void;
}

const AddCustomerForm: FC<Props> = ({ toggle }) => {
    const { addCustomer } = useSalesCounter();
    const store = useSelector((state: any) => state.store.store);
    const { loading, handleLoading } = useLoading(false);
    const [form] = Form.useForm();

    const [province, setProvince] = useState<string>();
    const [district, setDistrict] = useState<string>();

    const { loadingProvince, provinces } = useProvices();
    const { loadingDistrict, districts } = useDistricts(province);
    const { loadingWard, wards } = useWards({ province, district });

    const onChangeProvince = (e: string) => {
        setProvince(e);

        setDistrict(undefined);
        removeField('district');
        removeField('ward');
    };

    const onChangeDistrict = (e: string) => {
        setDistrict(e);

        removeField('ward');
    };

    const onChangeWard = (e: string) => {};

    const removeField = (field: string) => {
        form.setFieldsValue({
            [field]: undefined,
        });
    };

    const onSubmit = async (values: Store) => {
        try {
            handleLoading(true);

            const { name, email, phoneNo, address, province, district, ward } = values;
            const customer: ICustomer = await customerApi.createCustomer({
                storeId: store._id,
                data: {
                    name,
                    email,
                    phoneNo,
                    address,
                    province,
                    district,
                    ward,
                    source: 'pos',
                },
            });

            addCustomer(customer);
            if (toggle) {
                toggle();
            }
        } catch (error) {
            const { data } = error.response;

            if (data.statusCode === 409) {
                message.error('Số điện thoại đã tồn tại');
            } else {
                message.error('Xảy ra lỗi, vui lòng thử lại');
            }
        } finally {
            handleLoading(false);
        }
    };

    return (
        <Form layout='vertical' onFinish={onSubmit} form={form}>
            <Row gutter={15}>
                <Col span={12}>
                    <Form.Item
                        label='Tên khách hàng'
                        name='name'
                        rules={[{ required: true, message: 'Điền tên khách hàng ' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label='Số điện thoại'
                        name='phoneNo'
                        rules={[
                            { required: true, message: 'Điền số điện thoại' },
                            {
                                pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                                message: 'Số điện thoại không đúng',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                {/* <Col span={12}>
                    <Form.Item label='Ngày sinh'>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col> */}

                <Col span={12}>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                type: 'email',
                                message: 'Email không đúng',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label='Tỉnh/Thành phố' name='province'>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp='children'
                            onChange={onChangeProvince}
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            loading={loadingProvince}
                            onFocus={disabledAutosuggestion}
                        >
                            {map(provinces, (province: Province) => (
                                <Select.Option value={province.code} key={province.code}>
                                    {province.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label='Quận/Huyện' name='district'>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp='children'
                            onChange={onChangeDistrict}
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            loading={loadingDistrict}
                            disabled={!province}
                            onFocus={disabledAutosuggestion}
                        >
                            {map(districts, (district: District) => (
                                <Select.Option value={district.code} key={district.code}>
                                    {district.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label='Xã/Phường' name='ward'>
                        <Select
                            onChange={onChangeWard}
                            showSearch
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={!province || !district}
                            loading={loadingWard}
                            onFocus={disabledAutosuggestion}
                        >
                            {map(wards, (ward: Ward) => (
                                <Select.Option value={ward.code} key={ward.code}>
                                    {ward.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label='Địa chỉ khách hàng' name='address'>
                        <TextArea />
                    </Form.Item>
                </Col>
            </Row>

            <Row align='middle' justify='end' gutter={15}>
                <Col>
                    <Button disabled={loading} onClick={toggle}>
                        Hủy
                    </Button>
                </Col>
                <Col>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Thêm mới
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AddCustomerForm;
