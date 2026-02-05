import { Layout } from "@/components/Layout"
import { useTranslation } from "react-i18next"
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@/types/users";
import { useUsers } from "@/hooks/useUsers";

import { useRoles } from "@/hooks/useRoles";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ButtonGroup } from "@/components/ui/ButtonGroup";


export const Users = () => {
    const { t } = useTranslation();
    const { users, getUsers, loading, error, deleteUser } = useUsers();

    const { getRoles, roles } = useRoles();
    const [openDialog, setOpenDialog] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const PAGE_LIMIT = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    /**
     * Filters
     */
    const [includeRoles, setIncludeRoles] = useState(true);
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [role, setRole] = useState('');



    const [searchQuery, setSearchQuery] = useState('');



    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);





    // handle filters
    const handleFilter = (filter: string, value: string | number | boolean) => {
        // getUsers with filters
        getUsers({ [filter]: value });
    };

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        getRoles();
    }, [getRoles]);

    const handleOpenCreate = () => {
        setUserToEdit(null);
        setOpenDialog(true);
    };

    const handleEdit = (user: User) => {
        setUserToEdit(user);
        setOpenDialog(true);
    };


    const handleDelete = async (user: User) => {
        if (window.confirm(t('users.confirmDeleteUser'))) {
            await deleteUser(user.id);
        }
    };
    return (
        <Layout>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{t('users.title')}</h1>
                        <p className="text-muted-foreground">{t('users.subtitle')}</p>
                    </div>
                    <Button className="flex gap-2 py-4 px-6" onClick={handleOpenCreate}>
                        <Plus size={20} />
                        {t('users.createUser')}
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    {loading ? (
                        <p>{t('common.loading')}</p>
                    ) : users && users.length > 0 ? (
                        <Table
                            headers={[t('common.labels.name'), t('common.labels.email'), t('common.labels.role'), t('common.labels.state'), t('common.labels.actions')]}
                        >
                            {users.map((user) => (
                                <tr key={user.id} className="block md:table-row bg-card mb-4 rounded-lg shadow-sm border p-4 md:p-0 md:mb-0 md:shadow-none md:border-b md:border-border md:bg-transparent">
                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('common.labels.name')}</span>
                                        {user.name}
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('common.labels.email')}</span>
                                        {user.email}
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('common.labels.role')}</span>
                                        {user.roles.map(role => role.name).join(', ')}
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('common.labels.state')}</span>
                                        <Chip label={user.status} variant={user.status === 'active' ? 'default' : 'destructive'} />
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('common.labels.actions')}</span>
                                        <div className="flex gap-2">
                                            <ButtonGroup>
                                                <Button variant="ghost" className="justify-start" onClick={() => handleEdit(user)}>{t('common.labels.edit')}</Button>
                                                <Button variant="destructive" className="justify-start" onClick={() => handleDelete(user)}>{t('common.labels.delete')}</Button>
                                            </ButtonGroup>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    ) : (
                        <p className="text-center py-8 text-muted-foreground">{error || t('users.noRolesFound')}</p>
                    )}
                </div>


            </div>
        </Layout>
    )
}