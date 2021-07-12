import classNames from 'classnames';
import React, { useState } from 'react';
import { DownIcon, UpIcon } from '../../assets/icon';
import Products from './products';

interface Props {}

const ToggleProductList = (props: Props) => {
    const [show, setShow] = useState<boolean>(false);
    const toggle = () => setShow(!show);

    return (
        <div className={classNames('toggle-product-list', { show })}>
            <div onClick={toggle} className='btn-toggle'>
                <div className='arrow'>
                    <span className='icon'>{show ? <DownIcon /> : <UpIcon />}</span>

                    <div className='text'>Danh sách sản phẩm</div>
                </div>
            </div>
            {show && <Products />}
        </div>
    );
};

export default ToggleProductList;
