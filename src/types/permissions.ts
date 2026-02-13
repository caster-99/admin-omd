export interface Permission {
    id: number;
    name: string;
    description: string;
    classification: string;
}

export interface CreatePermissionDTO {
    name: string;
    description: string;
    classification: string;
}