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
    set: (value) => {
        console.log('сработал сеттер', value)
        if (value) store.updateDraftUser(value)
    }
})

const tableUsers = computed(() => {
    const users = [...store.users]

    // Добавляем шаблон пользователя в список, но не в стор
    if (store.draftUser && store.selectedKey === -1) {
        users.push(store.draftUser)
    }

    return users.reverse()
})

const handleSave = () => {
    if (store.draftUser && store.selectedKey !== null) {
        store.selectedKey === -1
            ? store.saveUser(store.draftUser)
            : store.updateUser(store.draftUser)
    }
}

const handleCancel = () => {
    store.resetSelect()
}

const handleAdd = () => {
    store.createDraftUser()
}

const handleDelete = () => {
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
                :users="tableUsers"
            />

        </div>
    </section>
</template>