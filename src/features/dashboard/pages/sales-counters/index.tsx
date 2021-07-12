import React, { FC, useEffect, useState } from 'react';
import { BaseLayout } from '../../../../layout';
import { Loading } from '../../../../components';
import { ProviderOrdersDraft, useOrdersDraft } from './state/orders-draft-context';
import ProviderContext from './state/context';
import Sales from './sales-counters';

const title = 'Bán hàng tại quầy';

const SalesCountersContent: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const { ordersDraft, orderIdDraftSelected } = useOrdersDraft();
    const [order, setOrder] = useState<any>();

    useEffect(() => {
        const orderDraftExist = ordersDraft.find((order) => order.id === orderIdDraftSelected);

        setOrder(orderDraftExist);
        setLoading(false);
    }, [orderIdDraftSelected, ordersDraft]);

    if (loading) {
        return <Loading full />;
    }

    return (
        <ProviderContext order={order}>
            <BaseLayout title={title}>
                <Sales />
            </BaseLayout>
        </ProviderContext>
    );
};

const SalesCounters = () => {
    return (
        <ProviderOrdersDraft>
            <SalesCountersContent />
        </ProviderOrdersDraft>
    );
};

export default SalesCounters;
