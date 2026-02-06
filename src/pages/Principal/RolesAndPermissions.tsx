import { Layout } from "@/components/Layout"
import { Tabs } from "@/components/ui/Tab";
import { Roles } from "@/components/ui/users/Roles";
import { Permissions } from "@/components/ui/users/Permissions";
import { useState } from "react";
import { useTranslation } from "react-i18next"

export const RolesAndPermissions = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<string>(t('tabs.roles'));
    return (
        <Layout>
            <div>

                <Tabs tabs={[t('tabs.roles'), t('tabs.permissions'), t('tabs.audit')]} activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === t('tabs.roles') &&
                    <Roles />
                }
                {activeTab === t('tabs.permissions') &&
                    <Permissions />
                }
                {activeTab === t('tabs.audit') &&
                    <></>
                }

            </div>
        </Layout>
    )
}