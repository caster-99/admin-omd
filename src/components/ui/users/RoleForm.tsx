import { useRoles } from "@/hooks/useRoles";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// to create and edit roles
export const RoleForm = () => {
    const { t } = useTranslation();
    const { getRoles, loading, error } = useRoles();
    useEffect(() => {
        getRoles();
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full">
            <h2>{t('users.createRole')}</h2>
            <form className="flex flex-col gap-4 w-full">
                <input type="text" placeholder={t('users.labels.name')} />
                <input type="text" placeholder={t('users.labels.description')} />
                <input type="text" placeholder={t('users.labels.hierarchy')} />
                <input type="text" placeholder={t('users.labels.status')} />
                <input type="text" placeholder={t('users.labels.permissions')} />
                <button type="submit">{t('users.createRole')}</button>
            </form>
        </div>
    )
}