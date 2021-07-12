import { Product, IProduct, IStock } from '../../../../../collections/product';

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}

export interface IState {
    search?: string;
    loading?: boolean;
    loadingStocks?: boolean;
    page?: number;
    limit?: number;
    total?: number;
    products: IProduct[];
    product?: IProduct;
    variant?: Product;
    stocks: IStock[];
}
