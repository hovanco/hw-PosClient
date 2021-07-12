import authSlide from '../features/auth/state/auth-slide';
import storeSlide from '../features/dashboard/state/store-slide';

const rootReducers = {
    auth: authSlide,
    store: storeSlide,
};

export default rootReducers;
