import React from 'react';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { FC } from 'react';
import constants from '../../../../constants';
import { BaseLayout } from '../../../../layout';
import Logo from '../../../../components/logo';
import HeaderUser from '../../../../components/header/header-user';
import './style.less';

const HEIGHT_HEADER = '50px';

const styleHeader = {
    height: HEIGHT_HEADER,
    padding: '0 15px',
    background: '#fff',
};

const Header: FC = () => {
    return (
        <Row justify='space-between' align='middle' style={{ ...styleHeader }}>
            <Col>
                <Logo />
            </Col>
            <Col>
                <HeaderUser />
            </Col>
        </Row>
    );
};

const NoChannel: FC = () => {
    const gotoStore = () => {
        window.location.href = `${constants.URL_STORE}setting/sale-channel`;
    };
    return (
        <BaseLayout title='Đăng ký sử dụng'>
            <div className='no-channel'>
                <Header />
                <Row
                    justify='center'
                    align='middle'
                    style={{ minHeight: `calc(95vh - ${HEIGHT_HEADER})` }}
                >
                    <Col md={8}>
                        <Card
                            type='inner'
                            bodyStyle={{
                                padding: '30px 15px',
                            }}
                            style={{ textAlign: 'center' }}
                        >
                            <Space direction='vertical' size={20}>
                                <div>
                                    <Typography.Title
                                        className='no-channel__title'
                                        type='danger'
                                        level={3}
                                    >
                                        Dịch vụ chưa đăng ký
                                    </Typography.Title>
                                    <Typography.Text className='no-channel__text'>
                                        Bạn chưa đăng ký sử dụng dịch vụ này. Nhấn vào nút bên dưới
                                        để đăng ký sử dụng.
                                    </Typography.Text>
                                </div>
                                <Button type='primary' size='large' onClick={gotoStore}>
                                    Đăng ký ngay
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        </BaseLayout>
    );
};

export default NoChannel;
