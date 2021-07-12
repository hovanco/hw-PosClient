import { ConfigProvider } from 'antd';
import vi_VN from 'antd/es/locale-provider/vi_VN';
import moment from 'moment';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import { store } from './state';

moment.locale('vi');

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={vi_VN}>
                <Routes />
            </ConfigProvider>
        </Provider>
    );
}

export default App;
