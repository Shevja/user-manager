<script setup lang="ts">
import UserManagerButtons from "@/components/UserManager/UserManagerButtons.vue";
import UserManagerTable from "@/components/UserManager/UserManagerTable.vue";
import {useUserStore} from "@/store";
import {computed} from "vue";

const store = useUserStore()

const selectedKey = computed({
    get: () => store.selectedKey,
    set: (value) => store.selectUser(value)
})

const draftUser = computed({
    get: () => store.draftUser,
    set: (value) => store.updateDraftUser(value)
})

const handleSave = () => {
    console.log('handleSave');
    if (store.draftUser) {
        store.updateUser(store.draftUser)
    }
}

const handleCancel = () => {
    console.log('handleCancel');
    store.resetSelection()
}

const handleAdd = () => {
    console.log('handleAdd');
    store.createDraftUser() // TODO: дописать логику добавления, валидации и сохранения
}

const handleDelete = () => {
    console.log('handleDelete');
    if (store.selectedKey !== null) {
        store.deleteUser(store.selectedKey)
    }
}
</script>

<template>
    <section class="py-10">
        <div class="custom-container">
            <UserManagerButtons
                class="mb-5"
                @onSave="handleSave"
                @onCancel="handleCancel"
                @onAdd="handleAdd"
                @onDelete="handleDelete"
            />

            <UserManagerTable
                v-model:selected-key="selectedKey"
                v-model:user-draft="draftUser"
                :users="store.users"
            />

        </div>
    </section>
</template>