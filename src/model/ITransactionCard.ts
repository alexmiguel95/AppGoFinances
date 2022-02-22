import StatusAccount from "./enums/statusAccount";

export interface TransactionCardProps {
    id: string;
    type: StatusAccount;
    name: string;
    amount: string;
    category: Category;
    date: string;
}

export interface Category {
    name: string;
    icon: string;
}
