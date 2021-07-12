import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { getToken } from '../api/token';
import { Loading, NotFound } from '../components';
import { GuestRouter, UserRouter } from './hoc-route';
import { useProgressAuth } from './use-progress-auth';

const Dashboard = lazy(() => import('../features/dashboard'));
const Auth = lazy(() => import('../features/auth'));

interface Props {}

const Routes: FC<Props> = () => {
    const token = getToken();
    const { loading, progress } = useProgressAuth();

    if ((progress || loading) && token) return <Loading full />;

    return (
        <Suspense fallback={<Loading full />}>
            <Router>
                <Switch>
                    <Redirect exact from='/' to={`/dashboard`} />
                    <UserRouter path='/dashboard'>
                        <Dashboard />
                    </UserRouter>

                    <GuestRouter path='/auth'>
                        <Auth />
                    </GuestRouter>
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Suspense>
    );
};

export default Routes;
