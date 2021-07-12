import { IOrder } from '../../../../../collections/order';

export interface IAction {
    type: string;
    payload?: any;
}

export interface IState {
    loading: boolean;
    orders: IOrder[];
    order?: IOrder;
    search?: string;
    page: number;
    limit: number;
    total: number;
    typeTime?: string;
    time?: string | string[];
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}
