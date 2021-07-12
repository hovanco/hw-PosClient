import axios from './axios-client';
import { ESaleChannel } from '../collections/sale-channel';
import { EBusinessType, IStore } from '../collections/store';

export interface IDataUpdateStore {
    name?: string;
    phoneNo?: string;
    address?: string;
    province?: string;
    district?: string;
    ward?: string;
    saleChannels?: ESaleChannel[];
    logoUrl?: string;
    email?: string;
    fax?: string;
    businessType?: typeof EBusinessType;
}


const basePath = '/store/v1/stores';

async function loadStore(): Promise<any> {
    const response = await axios({
        method: 'GET',
        url: basePath,
    });

    return response;
}

async function updateStore(storeId: string, data: IDataUpdateStore): Promise<IStore> {
    const response = await axios({
        method: 'PUT',
        url: `${basePath}/${storeId}`,
        data,
    });

    return response.data;
}

export default {
    loadStore,
    updateStore,
};
