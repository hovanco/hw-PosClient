import { Button, Empty, Space } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useSelector } from 'react-redux';
import productApi from '../../../../api/product-api';
import { IProduct } from '../../../../collections/product';
import { Loading } from '../../../../components';
import { CategorySelect } from './category-select';
import Product from './product';

interface Props {}

const LIMIT = 15;

const Products: FC<Props> = () => {
    const [page, setPage] = useState<number>(1);
    const store = useSelector((state: any) => state.store.store);
    const [category, setCategory] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [total, setTotal] = useState<number>(1);

    const loadMore = () => {
        if (Math.ceil(total / LIMIT) > page) {
            loadProducts(page + 1);
            setPage(page + 1);
        }
    };

    const loadProducts = async (pageNumber: number) => {
        try {
            setLoading(true);

            const query: any = {
                storeId: store._id,
                page: pageNumber,
                limit: LIMIT,
                withQuantity: true,
            };

            if (category) {
                query.categoryId = category;
            }

            const response = await productApi.getProducts(query);

            setProducts([...products, ...response.data]);
            setTotal(response.total);
            setPage(pageNumber);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const selectCategory = async (categoryId: string) => {
        setCategory(categoryId);

        const response = await productApi.getProducts({
            storeId: store._id,
            page: 1,
            limit: LIMIT,
            categoryId,
            withQuantity: true,
        });

        setPage(1);
        setProducts([...response.data]);
        setTotal(response.total);
    };

    const removeFilter = async () => {
        setCategory(undefined);

        const response = await productApi.getProducts({
            storeId: store._id,
            page: 1,
            limit: LIMIT,
            withQuantity: true,
        });

        setPage(1);
        setProducts([...response.data]);
        setTotal(response.total);
    };

    useEffect(() => {
        loadProducts(1);

        // eslint-disable-next-line
    }, []);

    const renderContent = () => {
        if (products.length > 0) {
            return (
                <InfiniteScroll
                    pageStart={page}
                    loadMore={loadMore}
                    hasMore={!loading && Math.ceil(total / LIMIT) > page}
                    useWindow={false}
                    initialLoad={false}
                    isReverse={false}
                    threshold={10}
                >
                    <div className='products'>
                        {products.map((product) => (
                            <Product product={product} key={product._id} />
                        ))}
                    </div>

                    {loading && <Loading />}
                </InfiniteScroll>
            );
        }

        if (loading && products.length === 0) {
            return <Loading />;
        }

        if (!loading && products.length === 0) {
            return (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Không có sản phẩm nào' />
            );
        }

        return <></>;
    };

    return (
        <div className='products-wrap'>
            <div style={{ padding: '15px 24px 0' }}>
                <Space size={3}>
                    <Button type='text' onClick={removeFilter}>
                        Tất cả sản phẩm
                    </Button>

                    <CategorySelect onSelect={selectCategory} categoryId={category} />

                    {/* 
                    //  Api not support get with "Nhà cung cấp" now.

                    <Button type='text'>
                        Nhà cung cấp <DownIcon />
                    </Button> */}
                </Space>
            </div>

            <div className='products-scroll' style={{ overflowY: 'auto' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Products;
