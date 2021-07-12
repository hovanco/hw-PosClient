import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import LogoInsa from '../../../../assets/images/insa-pos-logo.svg';

const HeaderPage: FC = () => {
    return (
        <div className='header-page'>
            <Link to='/'>
                <img src={LogoInsa} alt='' style={{ width: '150px', height: '30px' }} />
            </Link>
        </div>
    );
};

export default HeaderPage;
