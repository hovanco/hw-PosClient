import React, { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { NotFound } from '../../components';

// import pages
const Login = lazy(() => import('./pages/login'));
const SaveToken = lazy(() => import('./pages/save-token'));

interface Props {}

const Auth = (props: Props) => {
    const match = useRouteMatch();

    return (
        <div className='auth-layout'>
            <Switch>
                <Redirect exact from={match.url} to={`${match.url}/login`} />
                <Route component={Login} path={`${match.url}/login`} />
                <Route component={SaveToken} path={`${match.url}/save-token`} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default Auth;
