import { useState } from 'react';

const useLoading = (value?: boolean) => {
    const [loading, setLoading] = useState<boolean>(value || false);

    const handleLoading = (bool: boolean) => {
        setLoading(bool);
    };

    return {
        loading,
        handleLoading,
    };
};

export default useLoading;
