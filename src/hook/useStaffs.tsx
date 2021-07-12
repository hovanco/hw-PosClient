import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import staffApi from '../api/staff-api';
import { IStaff } from '../collections/staff';

const useStaffs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [staffs, setStaffs] = useState<IStaff[]>([]);
    const store = useSelector((state: any) => state.store.store);

    useEffect(() => {
        async function loadStaffs(storeId: string) {
            try {
                setLoading(true);
                const response = await staffApi.getStaffs(storeId);

                setStaffs(response);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        if (store._id) {
            loadStaffs(store._id);
        }
    }, [store._id]);

    const value = useMemo(() => ({ loading, staffs }), [loading, staffs]);

    return value;
};

export default useStaffs;
