import highlightCardType from "./enums/highlightCardType"

interface BalanceAccount {
    entry: BalanceAccountType;
    exits: BalanceAccountType; 
    total: BalanceAccountType; 
}

interface BalanceAccountType {
    type: highlightCardType;
    amount: string;
    firstData?: string;
    lastData: string;
}

interface Teste {
    
}

export default BalanceAccount;
