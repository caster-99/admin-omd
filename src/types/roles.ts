export interface Permission {
  id: number;
  name: string;
  description: string;
  classification: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  hierarchy: number;
  status: string;
  permissions: Permission[];
  created_at: string;
}

export interface CreateRoleDTO {
  name: string;
  description: string;
  permissions: number[]; // Array of permission IDs
}

export interface UpdateRoleDTO {
  name?: string;
  description?: string;
  permissions?: string[]; // Array of permission IDs
}
