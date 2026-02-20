export interface UserManagerButtonsProps {
    selectedKey: number | null;
}

export interface UserManagerButtonsEmits {
    (e: 'onSave'): void,
    (e: 'onCancel'): void,
    (e: 'onAdd'): void,
    (e: 'onDelete'): void,
}