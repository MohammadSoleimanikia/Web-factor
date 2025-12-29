export type Customer = {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    address: string;
};
export type CustomerCreate = {
    name: string;
    phone_number: string;
    email?: string;
    address?: string;
};
