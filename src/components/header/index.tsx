import { Col, Row } from 'antd';
import { maxBy } from 'lodash';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AliasPackage, EBillingPackageType, getPackagesActive } from '../../api/billing-api';
import { IPackage } from '../../collections/billing';
import { checkWarningExpiration } from '../../utils/get-time';
import BannerNotifyPackageTrial from '../banner-notify-package';
import BannerNotifyPackage from '../banner-notify-package/banner-package';
import HeaderLeft from './header-left';
import HeaderRight from './header-right';
import './header.less';

interface IPackageDetail {
    active: boolean;
    bonusPeriod: number;
    createdAt: string;
    expiredAt: string;
    packageType: number;
    paymentType: number;
    period: number;
    storeId: string;
    total: number;
    transactionCode: string;
    updatedAt: string;
    id: string;
}

const Header: FC = () => {
    const store = useSelector((state: any) => state.store.store);
    const [isExpired, setIsExpired] = useState<boolean>(false);
    const [expiredPackage, setExpiredPackage] = useState<number>();
    const [listNamePackage, setListNamePackage] = useState<Array<string>>([]);
    const [expiredTrial, setExpiredTrial] = useState<string>();
    const [isTrial, setIsTrial] = useState<boolean>(false);

    const handleCheckPackageType = (packages: IPackage[]) => {
        packages.forEach((item: IPackageDetail) => {
            if (item.packageType & EBillingPackageType.Trial) {
                setIsTrial(checkWarningExpiration(item.expiredAt));
                setExpiredTrial(item.expiredAt);
                setIsExpired(false);
            }
        });
    };

    const handelGetMaxExpiredAt = (packages: IPackage[]) => {
        let selectedRows: IPackage[] = [];
        packages.filter((element: IPackageDetail) => {
            if (
                element.packageType & EBillingPackageType.Omni ||
                element.packageType & EBillingPackageType.Trial ||
                element.packageType & EBillingPackageType.Pos
            )
                selectedRows.push(element);
        });
        const packageMaxExpired = maxBy(selectedRows, function (o) {
            return Math.round(moment(o.expiredAt).diff(moment(), 'days', true));
        });
        setIsExpired(checkWarningExpiration(packageMaxExpired?.expiredAt as string));
        setExpiredPackage(
            Math.round(moment(packageMaxExpired?.expiredAt).diff(moment(), 'days', true)),
        );
        if (!checkWarningExpiration(packageMaxExpired?.expiredAt as string)) {
            return;
        }
        let listName: Array<string> = [];
        selectedRows.forEach((item: IPackageDetail) => {
            if (item.packageType & EBillingPackageType.Omni) {
                listName.push(AliasPackage[EBillingPackageType.Omni]);
            }
            if (item.packageType & EBillingPackageType.Pos) {
                listName.push(AliasPackage[EBillingPackageType.Pos]);
            }
        });
        setListNamePackage(listName);
    };

    const getPackages = async () => {
        const packages: IPackage[] = await getPackagesActive(store._id);
        handelGetMaxExpiredAt(packages);
        handleCheckPackageType(packages);
    };
    useEffect(() => {
        getPackages();
    }, []);

    const handleCloseBannerTrial = () => {
        setIsTrial(false);
    };
    const handleCloseBannerFacebook = () => {
        setIsExpired(false);
    };

    return (
        <>
            <Col span={24} style={{ padding: 'unset' }}>
                <Col>
                    {isTrial && (
                        <BannerNotifyPackageTrial
                            expiredAtPackage={expiredTrial}
                            isExpired={isTrial}
                            handleCloseBanner={handleCloseBannerTrial}
                        />
                    )}
                    {isExpired && (
                        <BannerNotifyPackage
                            expired={expiredPackage}
                            isExpired={isExpired}
                            handleCloseBanner={handleCloseBannerFacebook}
                            namePackage={
                                listNamePackage?.length > 0 ? listNamePackage?.join(' ,') : ''
                            }
                        />
                    )}
                </Col>
            </Col>
            <div className='header'>
                <Row>
                    <Col span={24}>
                        <Row className='header-container' justify='space-between' align='middle'>
                            <Col>
                                <HeaderLeft />
                            </Col>
                            <Col>
                                <HeaderRight />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Header;
