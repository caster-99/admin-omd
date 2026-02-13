import { createContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import api from '../services/api';
import type { CreatePermissionDTO, Permission } from '../types/permissions';

interface PermissionsContextType {
    permissions: Permission[];
    loading: boolean;
    error: string | null;
    getPermissions: () => Promise<void>;
    getPermission: (id: number) => Promise<Permission | null>;
    groupedPermissions: Record<string, Permission[]>;
    createPermission: (permission: CreatePermissionDTO) => Promise<Permission | null>;
    updatePermission: (id: number, permission: CreatePermissionDTO) => Promise<Permission | null>;
    deletePermission: (id: number) => Promise<any>;
    classificationOptions: { value: string; label: string }[];
}

export const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPermissions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/permissions`);
            if (response.data.success) {
                setPermissions(response.data.data);
            } else {
                setError(response.data.message || 'Failed to fetch permissions');
            }
        } catch (err: any) {
            console.error('Error fetching permissions:', err);
            setError(err.response?.data?.message || err.message || 'Error fetching permissions');
        } finally {
            setLoading(false);
        }
    }, []);

    const getPermission = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/permissions/${id}`);
            if (response.data.success) {
                return response.data.data;
            }
            return null;
        } catch (err: any) {
            console.error(`Error fetching permission ${id}:`, err);
            setError(err.response?.data?.message || err.message || 'Error fetching permission');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const groupedPermissions = useMemo(() => {
        return permissions.reduce((acc, permission) => {
            const group = permission.classification || 'Others';
            if (!acc[group]) acc[group] = [];
            acc[group].push(permission);
            return acc;
        }, {} as Record<string, Permission[]>);
    }, [permissions]);

    const createPermission = useCallback(async (permission: CreatePermissionDTO) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(`/permissions`, permission);
            if (response.data.success) {
                const newPermission = response.data.data;
                setPermissions(prev => [...prev, newPermission]);
                return newPermission;
            }
            return null;
        } catch (err: any) {
            console.error('Error creating permission:', err);
            setError(err.response?.data?.message || err.message || 'Error creating permission');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePermission = useCallback(async (id: number, permission: CreatePermissionDTO) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/permissions/${id}`, permission);
            if (response.data.success) {
                const updatedPermission = response.data.data;
                setPermissions(prev => prev.map(p => p.id === id ? updatedPermission : p));
                return updatedPermission;
            }
            return null;
        } catch (err: any) {
            console.error('Error updating permission:', err);
            setError(err.response?.data?.message || err.message || 'Error updating permission');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deletePermission = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.delete(`/permissions/${id}`);
            if (response.data.success) {
                setPermissions(prev => prev.filter(p => p.id !== id));
                return response.data.data;
            }
            return null;
        } catch (err: any) {
            console.error('Error deleting permission:', err);
            setError(err.response?.data?.message || err.message || 'Error deleting permission');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const classificationOptions = useMemo(() => {
        if (!permissions || permissions.length === 0) return [];
        const uniqueClassifications = Array.from(
            new Set(permissions.map((p) => p.classification).filter(Boolean))
        );
        return uniqueClassifications.map((classification) => ({
            value: classification,
            label: classification
        }));
    }, [permissions]);

    return (
        <PermissionsContext.Provider value={{
            permissions,
            loading,
            error,
            getPermissions,
            getPermission,
            groupedPermissions,
            createPermission,
            updatePermission,
            deletePermission,
            classificationOptions,
        }}>
            {children}
        </PermissionsContext.Provider>
    );
};
