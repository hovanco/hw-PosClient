import React, { FC, ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import constants from '../constants';

interface Props {
    children: ReactNode;
    title?: string;
}

const BaseLayout: FC<Props> = ({ children, title = constants.title }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
};

export default BaseLayout;
