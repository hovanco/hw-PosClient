import axios from './axios-client';

export async function getStocks({
    storeId,
    warehouseId,
    productId,
    categoryId,
    brandId,
    search,
    page,
    limit,
    parentId,
}: {
    storeId: string;
    warehouseId?: string;
    productId?: string;
    categoryId?: string;
    brandId?: string;
    search?: string;
    page?: number;
    limit?: number;
    parentId?: string;
}): Promise<any> {
    const response = await axios({
        method: 'GET',
        url: `/store/v1/stores/${storeId}/stocks`,
        params: {
            page,
            limit,
            warehouseId,
            productId,
            categoryId,
            brandId,
            search,
            parentId,
        },
    });

    return response;
}

export async function getStock({
    storeId,
    parentId,
    productId,
}: {
    storeId: string;
    parentId?: string;
    productId?: string;
}): Promise<any> {
    const url = `/store/v1/stores/${storeId}/stocks`;

    const response = await axios({
        method: 'GET',
        url,
        params: {
            parentId,
            productId,
        },
    });

    return response;
}
