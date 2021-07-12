export interface ICustomer {
    _id: string;
    storeId: string;
    name: string;
    phoneNo: string;
    address?: string;
    fbPageId?: string;
    fbUserId?: string;
    email?: string;
    note?: string;
    district?: string;
    ward?: string;
    province?: string;
    code: string;
    provinceName?: string;
    districtName?: string;
    wardName?: string;
}
