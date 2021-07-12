import axios from './axios-client';

async function searchCustomers({
    storeId,
    page = 1,
    limit = 10,
    search,
}: {
    storeId: string;
    page?: number;
    limit?: number;
    search?: string;
}) {
    const url = `/store/v1/stores/${storeId}/customers?page=${page}&limit=${limit}`;
    const response = await axios({
        method: 'GET',
        url,
        params: {
            search,
        },
    });

    return response.data;
}

async function createCustomer({
    storeId,
    data,
}: {
    storeId: string;
    data: {
        name: string;
        phoneNo: string;
        address: string;
        email: string;
        province: string;
        district: string;
        ward: string;
        source?: string;
    };
}): Promise<any> {
    const url = `/store/v1/stores/${storeId}/customers`;

    const response = await axios({
        method: 'POST',
        url,
        data,
    });

    return response;
}

export default { createCustomer, searchCustomers };
