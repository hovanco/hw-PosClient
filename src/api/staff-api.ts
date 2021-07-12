import axios from './axios-client';

async function getStaffs(storeId: string): Promise<any> {
    const url = `/store/v1/stores/${storeId}/staffs`;

    const response = await axios({
        url,
        method: 'GET',
    });

    return response;
}

const staffApi = {
    getStaffs,
};

export default staffApi;
