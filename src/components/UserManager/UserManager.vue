<script setup lang="ts">
import UserManagerButtons from "@/components/UserManager/UserManagerButtons.vue";
import UserManagerTable from "@/components/UserManager/UserManagerTable.vue";
import {useUserStore} from "@/store";
import {ref, watch} from "vue";
import type {User} from "@/types";

const store = useUserStore()
const selectedKey = ref<number | null>(null);
const userDraft = ref<User | null>(null)

const handleSave = () => {
    console.log('handleSave');
}

const handleCancel = () => {
    console.log('handleCancel');

    selectedKey.value = null;
}

const handleAdd = () => {
    console.log('handleAdd');
}

const handleDelete = () => {
    console.log('handleDelete');
}

watch(
    selectedKey,
    (newKey) => {
        userDraft.value = newKey
            ? store.getUserDraft(newKey)
            : null
    }
)
</script>

<template>
    <section class="py-10">
        <div class="custom-container">
            <UserManagerButtons
                @onSave="handleSave"
                @onCancel="handleCancel"
                @onAdd="handleAdd"
                @onDelete="handleDelete"
            />
            <UserManagerTable
                v-model:selected-key="selectedKey"
                v-model:user-draft="userDraft"
                :users="store.users"
            />
        </div>
    </section>
</template>