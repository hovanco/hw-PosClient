export enum EUserRole {
    owner,
    manager,
    staff,
}

export interface IStaff {
    email: string;
    name: string;
    role: EUserRole;
    _id: string;
}
