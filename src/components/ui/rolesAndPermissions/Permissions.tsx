import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { usePermissions } from "@/hooks/usePermissions";
import { Chip } from "../Chip";
import { useUser } from "@/hooks/useUser";
import { Button } from "../Button";
import { Plus } from "lucide-react";
import { Dialog } from "../Dialog";
import { PermissionForm } from "./PermissionForm";

export const Permissions = () => {
    const { t } = useTranslation();
    const { getPermissions, error, loading, groupedPermissions, createPermission, updatePermission, deletePermission } = usePermissions();
    const [openDialog, setOpenDialog] = useState(false);
    const { user } = useUser();
    const userPermissions = user?.permissions?.map((permission) => permission.name);

    useEffect(() => {
        getPermissions();
    }, [getPermissions]);


    const handleOpenCreate = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };


    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-foreground">{t('permissions.title')}</h2>
                    {userPermissions?.includes('Crear Permisos') && (
                        <Button className="flex gap-2 py-4 px-6" onClick={handleOpenCreate}>
                            <Plus size={20} />
                            {t('common.labels.create')}
                        </Button>
                    )}
                </div>
                {userPermissions?.includes('Ver Permisos') ? (
                    <div className="flex flex-col gap-8">
                        {loading ? (
                            <Spinner />
                        ) : Object.keys(groupedPermissions).length > 0 ? (
                            Object.entries(groupedPermissions).map(([classification, items]) => (
                                <div key={classification} className="flex flex-col gap-4">
                                    <p className="text-lg font-semibold text-foreground">{classification.charAt(0).toUpperCase() + classification.slice(1)}

                                    </p>
                                    <div className="flex flex-wrap gap-2 w-fit">
                                        {items.map((permission) => (
                                            <Chip key={permission.id} label={permission.name} variant="outline" />
                                        ))}
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="text-center py-8 text-muted-foreground">{error || t('permissions.noPermissionsFound')}</p>
                        )}
                    </div>
                ) : (
                    <p className="text-center py-8 text-muted-foreground">{t('common.labels.noPermissions')}</p>
                )}
            </div>
            <Dialog open={openDialog} onClose={handleClose}>
                <PermissionForm onClose={handleClose} />
            </Dialog>

        </>
    )
}
