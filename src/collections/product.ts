export enum AttributeType {
    default,
    custom,
}

export interface ProductAttribute {
    _id: string;
    name: string;
    tags: string[];
    type: AttributeType;
    storeId: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    categoryId: string;
    storeId: string;
    originalPrice: number;
    price: number;
    code: string;
    brandId: string;
    unitId: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    quantity: number;
    images: string[];
    attributes: ProductAttribute[];
    parentId: string;
    isVariant: boolean;
    isDeleted: boolean;
    sku: string;
    shortDescription: string;
}

export interface IProduct extends Product {
    variants?: Product[];
    updatedAt: string;
    createdAt: string;
}

export interface IStock {
    _id: string;
    productId: IProduct;
    warehouseId: string;
    storeId: string;
    quantity: number;
}
