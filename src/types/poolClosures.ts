export type InvestmentType = 'coupon' | 'bep20';

export interface PendingTransaction {
    id: string;
    userId: number;
    userName: string;
    userInitials: string;
    avatarColor: string;
    type: InvestmentType;
    amountUSDT: number;
    date: string;
    status: 'pending';
}

export interface PoolClosure {
    id: number;
    title: string;
    description?: string;
    omdbPrice: number;
    executedAt: string;
    totalUSDT: number;
    transactionCount: number;
    createdBy: string;
}

export interface ExecuteClosureDTO {
    title: string;
    description?: string;
    omdbPrice: number;
}
