export interface TransactionUser {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
}

export interface Transaction {
    id: string;
    userId: string;
    poolId: string;
    amount: number;
    fee: number; // calculated or from backend
    net: number; // calculated or from backend
    currency: string;
    status: 'Pending' | 'Completed' | 'Failed' | 'Confirmed' | 'Cancelled'; 
    type: string; // 'Deposit', 'Withdrawal', 'Transfer', etc.
    txHash?: string;
    toAddress?: string;
    date: string; // ISO Date
    
    // Additional fields from backend
    referenceId?: string;
    description?: string;

    // Populated or Computed
    user?: TransactionUser;
}

export interface TransactionResponse {
    data: Transaction[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
