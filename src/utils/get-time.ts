import _ from 'lodash';
import moment from 'moment';
import { EBillingPackageType } from '../api/billing-api';
import { IPackage } from '../collections/billing';

export function isExpiredPackage(expiredTime: string) {
    const endTime = moment(expiredTime);
    const timeCurrent = moment();
    return endTime.diff(timeCurrent, 'days') < 0;
}

export function checkRestrictAction(packagesActive: IPackage[]) {
    return !_.some(packagesActive, (packageAct: IPackage) =>
        !isExpiredPackage(packageAct.expiredAt) && (
            packageAct.packageType === EBillingPackageType.Trial ||
            packageAct.packageType === EBillingPackageType.Omni ||
            packageAct.packageType & EBillingPackageType.Pos
        )
    );
}

function getNumOfDaysUntilExpired (timeStart: moment.Moment, timeEnd: moment.Moment) {
    return timeEnd.diff(timeStart, 'days')
}

export function checkWarningExpiration(expiredAt: string): boolean {
    const duration = getNumOfDaysUntilExpired(moment(), moment(expiredAt));
    return duration >= 0 && duration <= 10;
}
