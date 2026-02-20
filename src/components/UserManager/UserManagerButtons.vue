<script setup lang="ts">
import {Button} from "primevue";
import type {
    UserManagerButtonsEmits,
    UserManagerButtonsProps
} from "@/components/UserManager/UserManagerButtons.types.ts";

const props = defineProps<UserManagerButtonsProps>()

const emit = defineEmits<UserManagerButtonsEmits>();
</script>

<template>
    <div class="flex gap-2">
        <Button
            label="Сохранить"
            outlined
            :disabled="props.selectedKey === null"
            @click="emit('onSave')"
        />
        <Button
            label="Отменить"
            outlined
            @click="emit('onCancel')"
        />
        <Button
            label="Добавить"
            outlined
            severity="success"
            :disabled="props.selectedKey !== null"
            @click="emit('onAdd')"
        />
        <Button
            label="Удалить"
            outlined
            severity="danger"
            :disabled="props.selectedKey === null || selectedKey === -1"
            @click="emit('onDelete')"
        />
    </div>
</template>