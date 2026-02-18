<script setup lang="ts">
import UserManagerButtons from "@/components/UserManager/UserManagerButtons.vue";
import UserManagerTable from "@/components/UserManager/UserManagerTable.vue";
import {useUserStore} from "@/store";
import {ref} from "vue";
import type {User} from "@/types";

const store = useUserStore()
const selectedUser = ref<User | null>(null);
const userDraft = ref({key: 1, name: 'Иван', age: 25, city: 'Новосибирск'})

const handleSave = () => {
    console.log('handleSave');
}

const handleCancel = () => {
    console.log('handleCancel');
}

const handleAdd = () => {
    console.log('handleAdd');
}

const handleDelete = () => {
    console.log('handleDelete');
}
</script>

<template>
    <section class="py-10">
        {{ selectedUser }}
        <div class="custom-container">
            <UserManagerButtons
                @onSave="handleSave"
                @onCancel="handleCancel"
                @onAdd="handleAdd"
                @onDelete="handleDelete"
            />
            <UserManagerTable
                v-model:selected-item="selectedUser"
                v-model:user-draft="userDraft"
                :users="store.users"
            />
        </div>
    </section>
</template>