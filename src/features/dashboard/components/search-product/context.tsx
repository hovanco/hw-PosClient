import React, { createContext, FC, ReactNode, useContext } from 'react';
import { ProductState } from '../../pages/sales-counters/state/interface';

const initialContext = {
    selectProduct: (product: ProductState) => {},
};

const Context = createContext(initialContext);

interface Props {
    children: ReactNode;
    selectProduct: (product: ProductState) => void;
}

const ProviderContext: FC<Props> = ({ children, selectProduct }) => {
    const value = { selectProduct };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSearchProduct = () => {
    const values = useContext(Context);
    return {
        ...values,
    };
};

export default ProviderContext;
