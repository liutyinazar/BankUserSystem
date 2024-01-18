export interface IUserData {
    id: number;
    password: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

export interface IBankData {
    id: number;
    bank_name: string;
    routing_number: string;
    swift_bic: string;
}