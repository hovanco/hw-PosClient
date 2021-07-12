import React, { FC, createContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';
import { IContext } from './reducer/interface';
import reducer, { initialReducer } from './reducer/reducer';

const initialContext = {
    state: initialReducer,
    dispatch: () => null,
};

export const ProductContext = createContext<IContext>(initialContext);

interface Props {
    children: React.ReactChild;
}

export const ProductProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, initialReducer);

    const value = useMemo(
        () => ({ state, dispatch }),
        // eslint-disable-next-line
        [state],
    );

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
