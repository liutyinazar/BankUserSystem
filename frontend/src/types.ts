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
    bank_name: string;
    routing_number: string;
    swift_bic: string;
}