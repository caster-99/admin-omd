import { useTranslation } from "react-i18next"
import { Button } from "../Button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRoles } from "@/hooks/useRoles";
import { Table } from "../Table";
import { ButtonGroup } from "../ButtonGroup";
import { Dialog } from "../Dialog";
import { RoleForm } from "./RoleForm";
import type { Role } from "@/types/roles";
export const Roles = () => {
    const { t } = useTranslation();
    const { roles, getRoles, loading, error, deleteRole } = useRoles();
    const [openDialog, setOpenDialog] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);

    useEffect(() => {
        getRoles();
    }, [getRoles]);

    const handleOpenCreate = () => {
        setRoleToEdit(null);
        setOpenDialog(true);
    };

    const handleEdit = (role: Role) => {
        setRoleToEdit(role);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setRoleToEdit(null);
    };

    const handleDelete = async (role: Role) => {
        if (window.confirm(t('users.confirmDeleteRole'))) {
            await deleteRole(role.id);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">{t('users.roleManagement')}</h2>
                    <Button className="flex gap-2 py-4 px-6" onClick={handleOpenCreate}>
                        <Plus size={20} />
                        {t('users.createRole')}
                    </Button>
                </div>
                <div className="flex flex-col gap-4">
                    {loading ? (
                        <p>{t('common.loading')}</p>
                    ) : roles && roles.length > 0 ? (
                        <Table
                            title={t('users.roles')}
                            subtitle={t('users.rolesList')}
                            headers={[t('users.labels.name'), t('users.labels.hierarchy'), t('users.labels.state'), t('users.labels.created'), t('users.labels.actions')]}
                        >
                            {roles.map((role) => (
                                <tr key={role.id} className="block md:table-row bg-card mb-4 rounded-lg shadow-sm border p-4 md:p-0 md:mb-0 md:shadow-none md:border-b md:border-border md:bg-transparent">
                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('users.labels.name')}</span>
                                        {role.name}
                                    </td>
                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('users.labels.hierarchy')}</span>
                                        {role.hierarchy}
                                    </td>
                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('users.labels.state')}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${role.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {role.status}
                                        </span>
                                    </td>
                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('users.labels.created')}</span>
                                        {/* @ts-ignore - Assuming created_at exists on role but might not be in the type yet or just role.created_at was a typo */}
                                        {role.created_at || 'N/A'}
                                    </td>
                                    <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0">
                                        <span className="font-semibold md:hidden text-muted-foreground">{t('users.labels.actions')}</span>
                                        <div className="flex gap-2">
                                            <ButtonGroup>
                                                <Button variant="ghost" className="justify-start" onClick={() => handleEdit(role)}>{t('users.labels.edit')}</Button>
                                                <Button variant="destructive" className="justify-start" onClick={() => handleDelete(role)}>{t('users.labels.delete')}</Button>
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
            <Dialog open={openDialog} onClose={handleClose}>
                <RoleForm onClose={handleClose} roleToEdit={roleToEdit} />
            </Dialog>
        </>
    )
}
