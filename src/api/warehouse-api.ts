import axios from './axios-client';

interface ILoadWarehouse {
    storeId: string;
    page?: number;
    limit?: number;
}

async function loadWarehouse({ storeId, page, limit }: ILoadWarehouse): Promise<any> {
    const url = `/store/v1/stores/${storeId}/warehouses`;

    const response = await axios({
        method: 'GET',
        url,
        params: {
            page,
            limit,
        },
    });

    return response;
}

export default {
    loadWarehouse,
};
