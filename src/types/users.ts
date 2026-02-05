import type { Role } from "./roles";

export interface User {
    id: number;
    email: string;
    username: string;
    name: string;
    lastname: string;
    phone: string;
    balance: number;
    password: string;
    roles: Pick<Role, 'id' | 'name'>[]; // only id and name
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface UserFilters {
    includeRoles?: boolean;
    page?: number;
    limit?: number;
    name?: string;
    username?: string;
    email?: string;
    lastname?: string;
    balance?: number | string;
    role?: number | string;
    includePermissions?: boolean;
}
