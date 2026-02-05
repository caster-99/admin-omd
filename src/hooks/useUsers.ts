import { useState, useCallback } from 'react';
import api from '../services/api';
import type  { Role, CreateRoleDTO, UpdateRoleDTO } from '../types/roles';
import { toast } from 'react-toastify';
import type { User, UserFilters } from '@/types/users';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const getUsers = useCallback(async (filters: UserFilters = { includePermissions: true }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users/search', { params: filters });
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch users');
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || err.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/users/${id}?includePermissions=true`);
      if (response.data.success) {
        return {data: response.data.data, pagination: response.data.pagination};
      }
      return null;
    } catch (err: any) {
      console.error(`Error fetching role ${id}:`, err);
      setError(err.response?.data?.message || err.message || 'Error fetching role');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/users', user);
      if (response.data.success) {
        await getUsers(); // Refresh the list
        return response.data.data;
      } else {
        toast(response.data.message || 'Failed to create role', {
            type: 'error',
           })
           setError(response.data.message || 'Failed to create role');
         throw new Error(response.data.message || 'Failed to create role');
         
      }
    } catch (err: any) {
      console.error('Error creating role:', err);
      setError(err.response?.data?.message || err.message || 'Error creating role');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getUsers]);

  const updateUser = useCallback(async (id: number, user: User) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/users/${id}`, user);
      if (response.data.success) {
        await getUsers(); // Refresh the list
        return response.data.data;
      } else {
         throw new Error(response.data.message || 'Failed to update role');
      }
    } catch (err: any) {
      console.error('Error updating role:', err);
      setError(err.response?.data?.message || err.message || 'Error updating role');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getUsers]);

  const deleteUser = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/users/${id}`);
       if (response.data.success) {
        await getUsers(); // Refresh the list
        return true;
      } else {
         throw new Error(response.data.message || 'Failed to delete role');
      }
    } catch (err: any) {
      console.error('Error deleting role:', err);
      setError(err.response?.data?.message || err.message || 'Error deleting role');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getUsers]);

  return {
    users,
    loading,
    error,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
  };
};