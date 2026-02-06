export interface Coupon {
    id: number;
    code: string;
    amount: number;
    is_redeemed: boolean;
    redeemed_by: number;
    expiration_date: Date;
    created_at: Date;
    updated_at: Date;
    updated_by: number;
    created_by: number;
    pool: string;
    creator: {
        id: number;
        email: string;
        username: string;
    };
    redeemed_user: {
        id: number;
        email: string;
        username: string;
    };
}