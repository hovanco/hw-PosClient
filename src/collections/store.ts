import { ESaleChannel } from './sale-channel';

export interface IStore {
    _id: string;
    name: string;
    ownerId: any;
    phoneNo: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    code: string;
    warehouseId: string;
    provinceName: string;
    districtName: string;
    wardName: string;
    role: number;
    saleChannels: ESaleChannel[];
}

export enum EBusinessType {
    Others = 0,
    Fashion = 1,
    MomAndBaby = 2,
    Accessories = 3,
    Furniture = 4,
    Food = 5,
    Cosmetic = 6,
    Services = 7,
}
