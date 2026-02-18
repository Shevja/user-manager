<script setup lang="ts">
import type {User} from "@/types";
import {Column, DataTable, InputText} from "primevue";

interface UserManagerTableProps {
    users: User[];
    userDraft: User;
}

const props = defineProps<UserManagerTableProps>()

const selectedItem = defineModel<User | null>('selectedItem', {default: null});
</script>

<template>
    <DataTable
        v-model:selection="selectedItem"
        :value="props.users"
        data-key="key"
    >
        <Column selection-mode="single"/>

        <Column field="name" header="Имя">
            <template #body="{ data }">
                <div v-if="data.key === selectedItem?.key">
                    <InputText
                        v-model="userDraft.name"
                        type="text"
                    />
                </div>
                <div v-else>
                    {{ data.name }}
                </div>
            </template>
        </Column>

        <Column field="age" header="Возраст"/>
        <Column field="city" header="Город"/>
    </DataTable>
</template>