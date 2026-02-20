export interface UserManagerButtonsProps {
    selectedKey: number | null;
    isCreateMode: boolean;
}

export interface UserManagerButtonsEmits {
    (e: 'onSave'): void,
    (e: 'onCancel'): void,
    (e: 'onAdd'): void,
    (e: 'onDelete'): void,
}