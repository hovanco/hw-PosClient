import React, { FC } from 'react';
import InsaPosLogo from '../../assets/images/insa-pos-logo.svg';
import './style.less';

const textLogo = 'Insa Pos';

const Logo: FC = () => {
    return (
        <div className='logo'>
            <img src={InsaPosLogo} alt={textLogo} />
        </div>
    );
};

export default Logo;
