export interface IUserData {
    id: number;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

export interface IBankData {
    id: number;
    bankName: string;
    routingNumber: string;
    swiftBic: string;
}