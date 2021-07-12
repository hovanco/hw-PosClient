import axios from './axios-client';

const LIMIT = 10;

async function getCategories({
    storeId,
    page = 1,
    limit = LIMIT,
    search,
}: {
    storeId: string;
    page?: number;
    limit?: number;
    search?: string;
}) {
    const url = `/store/v1//stores/${storeId}/categories`;
    const response = await axios({
        method: 'GET',
        url,
        params: {
            search,
            page,
            limit,
        },
    });

    return response;
}

export { getCategories };
