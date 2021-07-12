import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ICategory } from '../../../../collections/category';

interface Props {
    categoryId?: string;
}

const ProductCategory: FC<Props> = ({ categoryId }) => {
    const categories = useSelector((state: any) => state.store.categories);

    const category: ICategory = categoryId
        ? categories.find((item: ICategory) => item._id === categoryId)
        : undefined;

    if (!category) {
        return <>---</>;
    }

    return <span>{category.name}</span>;
};

export default ProductCategory;
