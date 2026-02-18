<script setup lang="ts">
import {Button} from "primevue";

const emit = defineEmits<{
    (e: 'onSave'): void,
    (e: 'onCancel'): void,
    (e: 'onAdd'): void,
    (e: 'onDelete'): void,
}>();
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
            @click="emit('onAdd')"
        />
        <Button
            label="Удалить"
            outlined
            @click="emit('onDelete')"
        />
    </div>
</template>