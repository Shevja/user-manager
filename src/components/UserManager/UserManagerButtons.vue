<script setup lang="ts">
import {Button} from "primevue";
import type {UserManagerButtonsEmits} from "@/components/UserManager/UserManagerButtons.types.ts";

const emit = defineEmits<UserManagerButtonsEmits>();
</script>

<template>
    <div class="flex gap-2">
        <Button
            label="Сохранить"
            outlined
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
            @click="emit('onAdd')"
        />
        <Button
            label="Удалить"
            outlined
            severity="danger"
            @click="emit('onDelete')"
        />
    </div>
</template>