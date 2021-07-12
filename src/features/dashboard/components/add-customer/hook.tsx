import { useEffect, useState } from 'react';
import locationApi from '../../../../api/location-api';
import { District, Province, Ward } from './interface';

const useProvices = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [loadingProvince, setLoadingProvince] = useState<boolean>(true);

    useEffect(() => {
        async function getListProvinces() {
            try {
                const response = await locationApi.getProvinces();

                setProvinces(response);
                setLoadingProvince(false);
            } catch (error) {
                setProvinces([]);
                setLoadingProvince(false);
            }
        }
        getListProvinces();
    }, []);

    return {
        provinces,
        loadingProvince,
    };
};

const useDistricts = (province?: string) => {
    const [districts, setDistricts] = useState<District[]>([]);

    const [loadingDistrict, setLoadingDistrict] = useState<boolean>(false);

    useEffect(() => {
        async function getListDistricts() {
            if (!province) return;

            setLoadingDistrict(true);

            try {
                const response = await locationApi.getDistricts(province);

                setDistricts(response);
                setLoadingDistrict(false);
            } catch (error) {
                setDistricts([]);
                setLoadingDistrict(false);
            }
        }

        getListDistricts();
    }, [province]);

    return {
        districts,
        loadingDistrict,
    };
};

const useWards = ({ province, district }: { province?: string; district?: string }) => {
    const [wards, setWards] = useState<Ward[]>([]);
    const [loadingWard, setLoadingWard] = useState<boolean>(false);

    useEffect(() => {
        async function getListWard() {
            if (!province || !district) return;
            setLoadingWard(true);
            try {
                const response = await locationApi.getWards({
                    provinceId: province,
                    districtId: district,
                });
                setWards(response);
                setLoadingWard(false);
            } catch (error) {
                setWards([]);
                setLoadingWard(false);
            }
        }
        getListWard();
    }, [district, province]);

    return {
        wards,
        loadingWard,
    };
};

export { useProvices, useDistricts, useWards };
