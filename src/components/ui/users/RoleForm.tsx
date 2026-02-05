import { useRoles } from "@/hooks/useRoles";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import { Input } from "../Input";
import { Select } from "../Select";
import { TextArea } from "../TextArea";
import { Label } from "../Label";
import { LabelInput } from "../LabelInput";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Role } from "@/types/roles";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    hierarchy: yup.string().required('Hierarchy is required'),
});

type FormData = yup.InferType<typeof schema>;

interface RoleFormProps {
    onClose: () => void;
    roleToEdit?: Role | null;
}

export const RoleForm = ({ onClose, roleToEdit }: RoleFormProps) => {
    const { t } = useTranslation();
    const { createRole, updateRole, loading } = useRoles();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: roleToEdit?.name || "",
            description: roleToEdit?.description || "",
            hierarchy: roleToEdit?.hierarchy.toString() || "3",
        }
    });

    useEffect(() => {
        if (roleToEdit) {
            reset({
                name: roleToEdit.name,
                description: roleToEdit.description,
                hierarchy: roleToEdit.hierarchy.toString(),
            });
        } else {
            reset({
                name: "",
                description: "",
                hierarchy: "3",
            });
        }
    }, [roleToEdit, reset]);

    const hierarchyOptions = [
        { value: '3', label: 'Manager (Nivel 3)' },
        { value: '4', label: 'Support (Nivel 4)' },
    ]

    const onSubmit = async (data: FormData) => {
        try {
            if (roleToEdit) {
                await updateRole(roleToEdit.id, {
                    name: data.name,
                    description: data.description,
                    // hierarchy is not in DTO but might be needed? 
                    // Sticking to DTO for now as per current types
                });
                toast.success('Role updated successfully');
            } else {
                await createRole({
                    name: data.name,
                    description: data.description,
                    permissions: [1, 2]
                });
                toast.success('Role created successfully');
            }
            onClose();
        } catch (err: any) {
            console.error(err);
        }
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <h2 className="text-xl font-bold">{roleToEdit ? t('users.editRole') : t('users.createRole')}</h2>
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                <LabelInput>
                    <Label htmlFor="name">{t('users.labels.name')}</Label>
                    <Input
                        id="name"
                        type="text"
                        {...register("name")}
                        placeholder={t('users.labels.name')}
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </LabelInput>

                <LabelInput>
                    <Label htmlFor="description">{t('users.labels.description')}</Label>
                    <TextArea
                        id="description"
                        {...register("description")}
                        placeholder={t('users.labels.description')}
                        rows={5}
                    />
                    {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                </LabelInput>

                <LabelInput>
                    <Label htmlFor="hierarchy">{t('users.labels.hierarchy')}</Label>
                    <Select
                        id="hierarchy"
                        options={hierarchyOptions}
                        {...register("hierarchy")}
                    />
                    {errors.hierarchy && <span className="text-red-500 text-xs">{errors.hierarchy.message}</span>}
                </LabelInput>

                <div className="flex justify-end gap-2 mt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        {t('common.cancel')}
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {roleToEdit ? t('common.save') : t('users.createRole')}
                    </Button>
                </div>
            </form>
        </div>
    )
}