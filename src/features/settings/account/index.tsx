import React, { FC } from 'react';

import { Modal } from 'antd';
import FormSettingAccount from './form';

import './style.less';

interface Props {
    visible: boolean;
    toggle: () => void;
}

const SettingAccounts: FC<Props> = ({ visible, toggle }) => {
    return (
        <Modal
            visible={visible}
            title={undefined}
            footer={null}
            onCancel={toggle}
            closable={false}
            destroyOnClose
            wrapClassName='modal-setting-account'
        >
            <div className='modal-name'>Cài đặt tài khoản</div>
            <FormSettingAccount toggleModal={toggle} />
        </Modal>
    );
};

export default SettingAccounts;
