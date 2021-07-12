import { Modal } from 'antd';
import React, { FC, ReactElement } from 'react';
import useVisble from '../../../../hook/useVisible';
import AddCustomerForm from './add-customer-form';

interface Props {
    children: ReactElement;
}

const AddCustomer: FC<Props> = ({ children }: Props) => {
    const { visible, toggle } = useVisble();

    return (
        <>
            {React.cloneElement(children, { onClick: toggle })}

            <Modal
                visible={visible}
                onCancel={toggle}
                footer={null}
                title={
                    <div className='title-custom'>
                        <span>Thêm khách hàng</span>
                    </div>
                }
                className='modal-custom'
                destroyOnClose
            >
                <AddCustomerForm toggle={toggle} />
            </Modal>
        </>
    );
};

export default AddCustomer;
