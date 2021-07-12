import { Col, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import ExpiredStore from '../../../../components/expired-store';
import constants from '../../../../constants';
import useHiddenModalExpired from '../../../../hook/use-hidden-modal-expired';
import {
    CardBill,
    CardProductsSelect,
    CardSearchCustomer,
    CardSearchProduct,
    CardStaff,
} from '../../components';
import { useSalesCounter } from './state/context';

const Sales: FC = () => {
    const { isRestrictAction, getPackages } = useSalesCounter();
    const [visible, setVisible] = useState(false);
    const { hiddenModalExpired, setValueHidden } = useHiddenModalExpired();

    const handleCancelPopup = () => {
        setVisible(false);
        setValueHidden('true');
    };

    const handleBuyPackage = () => {
        window.open(`${constants.URL_STORE}setting/billings/list`, '_blank');
    };

    useEffect(() => {
        getPackages();
    }, []);

    useEffect(() => {
        setVisible(isRestrictAction);
    }, [isRestrictAction]);

    return (
        <>
            {!hiddenModalExpired && (
                <ExpiredStore
                    visible={visible}
                    onCancel={handleCancelPopup}
                    onBuyPackage={handleBuyPackage}
                />
            )}

            <Row gutter={15} style={{ minHeight: `calc(100vh - 90px)` }}>
                <Col span={15}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardSearchProduct />

                        <div style={{ flex: 1, margin: '15px 0' }}>
                            <CardProductsSelect />
                        </div>

                        <CardStaff />
                    </div>
                </Col>
                <Col span={9}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardSearchCustomer />
                        <div style={{ flex: 1, margin: '15px 0 0' }}>
                            <CardBill />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Sales;
