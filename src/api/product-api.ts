import axios from './axios-client';
import { IProduct, ProductAttribute, Product } from '../collections/product';

const basePath = '/store/v1/stores';

const productApi = {
    getProducts: async ({
        storeId,
        page,
        limit,
        categoryId,
        search,
        sort,
        direction,
        warehouseId,
        withQuantity,
        variant,
    }: {
        storeId: string;
        page: number;
        limit: number;
        categoryId?: string;
        search?: string;
        sort?: string;
        direction?: string;
        warehouseId?: string;
        withQuantity?: boolean;
        variant?: boolean;
    }): Promise<any> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/products`,
            params: {
                page,
                limit,
                categoryId,
                search,
                sort,
                direction,
                warehouseId,
                withQuantity,
                variant,
            },
        });

        return response;
    },

    getProduct: async ({
        storeId,
        productId,
    }: {
        storeId: string;
        productId: string;
    }): Promise<any> => {
        const url = `${basePath}/${storeId}/products/${productId}`;

        const response = await axios({
            method: 'GET',
            url,
        });

        return response;
    },

    updateProduct: async (storeId: string, productId: string, form: any): Promise<any> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}`,
            data: form,
        });

        return response;
    },

    deleteProduct: async (storeId: string, productId: string): Promise<any> => {
        const response = await axios({
            method: 'DELETE',
            url: `${basePath}/${storeId}/products/${productId}`,
        });

        return response;
    },

    createProduct: async (storeId: string, form: IProduct): Promise<any> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/products`,
            data: form,
        });

        return response;
    },

    getAttributes: async (storeId: string): Promise<any> => {
        const response = await axios({
            method: 'GET',
            url: `${basePath}/${storeId}/attributes`,
        });

        return response;
    },

    createAttribute: async (storeId: string, attribute: ProductAttribute): Promise<any> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/attributes`,
            data: attribute,
        });

        return response;
    },

    editVariant: async (
        storeId: string,
        productId: string,
        productVariantId: string,
        variant: any
    ): Promise<any> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/product-variants/${productVariantId}`,
            data: variant,
        });

        return response;
    },

    addAttributeProductVariants: async (
        storeId: string,
        productId: string,
        attributes: any[]
    ): Promise<any> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/attributes/add`,
            data: { attributes },
        });

        return response;
    },

    deleteVariant: async (
        storeId: string,
        productId: string,
        productVariantId: string
    ): Promise<any> => {
        const response = await axios({
            method: 'DELETE',
            url: `${basePath}/${storeId}/products/${productId}/product-variants/${productVariantId}`,
        });

        return response;
    },

    replaceAttributeByNewOne: async (
        storeId: string,
        productId: string,
        attributes: any[]
    ): Promise<any> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/attributes/replace`,
            data: { attributes },
        });

        return response;
    },

    changeOrderAttributesAndTags: async (
        storeId: string,
        productId: string,
        attributes: any[]
    ): Promise<any> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/attributes/sort`,
            data: { attributes },
        });

        return response;
    },

    createVariant: async (storeId: string, productId: string, variant: Product): Promise<any> => {
        const response = await axios({
            method: 'POST',
            url: `${basePath}/${storeId}/products/${productId}/product-variants`,
            data: variant,
        });

        return response;
    },

    updateVariant: async (
        storeId: string,
        productId: string,
        variantId: string,
        variant: Product
    ): Promise<any> => {
        const response = await axios({
            method: 'PUT',
            url: `${basePath}/${storeId}/products/${productId}/product-variants/${variantId}`,
            data: variant,
        });

        return response;
    },
};

export default productApi;
