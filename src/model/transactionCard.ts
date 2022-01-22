import StatusAccount from "./enums/statusAccount";

export interface TransactionCardProps {
    type: StatusAccount;
    title: string;
    amount: string;
    category: Category;
    date: string;
}

export interface Category {
    name: string;
    icon: string;
}
