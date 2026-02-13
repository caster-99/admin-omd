import { useRoles } from "@/hooks/useRoles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Permission, Role } from "@/types/roles";
import { usePermissions } from "@/hooks/usePermissions";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/context/AuthContext";
import { Select } from "../Select";
// import { useAuth } from "@/ho";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    classification: yup.string().required('Classification is required'),
});

type FormData = yup.InferType<typeof schema>;

interface PermissionFormProps {
    onClose: () => void;
    onSuccess?: () => void;
    permissionToEdit?: Permission | null;
    // reload: () => void;
}

export const PermissionForm = ({ onClose, onSuccess, permissionToEdit }: PermissionFormProps) => {
    const { t } = useTranslation();
    const { getPermissions, classificationOptions, createPermission, loading, error, updatePermission } = usePermissions()

    const [classifications, setClassifications] = useState<{ value: string, label: string }[]>([]);

    useEffect(() => {
        getPermissions();
    }, [getPermissions]);

    useEffect(() => {
        // add an empty value to the classificationOptions
        const emptyOption = { value: "", label: t('permissions.selectClassification') };
        setClassifications([emptyOption, ...classificationOptions]);
        // console.log(classificationOptions);
    }, [classificationOptions]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: permissionToEdit?.name || "",
            description: permissionToEdit?.description || "",
            classification: permissionToEdit?.classification || "",
        }
    });



    useEffect(() => {
        if (permissionToEdit) {
            reset({
                name: permissionToEdit.name,
                description: permissionToEdit.description,
                classification: permissionToEdit.classification,
            });
            // setSelectedPermissions(permissionToEdit.permissions);
        } else {
            reset({
                name: "",
                description: "",
                classification: "",
            });
        }
    }, [permissionToEdit, reset]);



    const onSubmit = async (data: FormData) => {
        try {
            if (permissionToEdit) {
                await updatePermission(permissionToEdit.id, {
                    name: data.name,
                    description: data.description,
                    classification: data.classification,
                });
                toast.success(t('common.messages.updateSuccess') || 'Permission updated successfully');
            } else {
                await createPermission({
                    name: data.name,
                    description: data.description,
                    classification: data.classification,
                });
                toast.success(t('common.messages.createSuccess') || 'Permission created successfully');
            }
            if (onSuccess) onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Error processing request');
        }
    }



    const renderRoleContent = () => (
        <>

            <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder={t('common.labels.name')}
                className="w-full"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}

            <TextArea
                id="description"
                {...register("description")}
                placeholder={t('common.labels.description')}
                rows={5}
            />
            {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}


            <Select
                id="classification"
                options={classifications}
                {...register("classification")}
                label={t('common.labels.classification')}
                className="w-full"
            />
            {errors.classification && <span className="text-red-500 text-xs">{errors.classification.message}</span>}


            <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    {t('common.cancel')}
                </Button>
                <Button type="submit" disabled={loading}>
                    {permissionToEdit ? t('common.save') : t('common.create')}
                </Button>
            </div>
        </>
    );

    return (
        <div className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-bold">{permissionToEdit ? t('permissions.editPermission') : t('permissions.createPermission')}</h2>
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                {renderRoleContent()}
            </form>
        </div>
    )
}