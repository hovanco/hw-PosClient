import React, { FC, ReactNode } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface Props {
    children: ReactNode;
}

const GuestRouter: FC<Props & RouteProps> = ({ children, ...rest }): JSX.Element => {
    const isAuth = useSelector((state: any) => state.auth.isAuth);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

const UserRouter: FC<Props & RouteProps> = ({ children, ...rest }): JSX.Element => {
    const isAuth = useSelector((state: any) => state.auth.isAuth);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export { GuestRouter, UserRouter };
