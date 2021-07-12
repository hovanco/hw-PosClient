import { debounce } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import customerApi from '../../../../api/customer-api';
import { ICustomer } from '../../../../collections/customer';
import SearchDropdown from '../../../../components/search-dropdown';
import useLoading from '../../../../hook/useLoading';
import Customers from './customers';
import InputSearch from './input-search';

interface Props {}

const SearchCustomer = (props: Props) => {
    const store = useSelector((state: any) => state.store.store);

    const { loading, handleLoading } = useLoading(false);

    const [customers, setCustomers] = useState<ICustomer[]>([]);

    const [optionGuest, setOptionGuest] = useState<boolean>(true);

    const onChange = debounce((textString?: string) => {
        if (!textString) {
            setOptionGuest(true);
        } else {
            setOptionGuest(false);
        }

        handleLoading(true);

        customerApi
            .searchCustomers({
                storeId: store._id,
                search: textString,
            })
            .then((res) => {
                setCustomers(res);
            })
            .finally(() => {
                handleLoading(false);
            });
    }, 500);

    useEffect(() => {
        onChange();
    }, []);

    return (
        <SearchDropdown className='search-customer' input={<InputSearch onChange={onChange} />}>
            <Customers
                customers={customers}
                loading={loading}
                optionGuest={optionGuest}
            />
        </SearchDropdown>
    );
};

export default SearchCustomer;
