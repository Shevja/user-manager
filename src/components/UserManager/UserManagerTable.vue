<script setup lang="ts">
import type {User} from "@/types";
import {
    Column,
    DataTable,
    InputText,
    InputNumber,
    Checkbox,
    Select
} from "primevue";

interface UserManagerTableProps {
    users: User[];
}

const props = defineProps<UserManagerTableProps>()

const userDraft = defineModel<User | null>('userDraft', {default: null})
const selectedKey = defineModel<number | null>('selectedKey', {default: null})

const cities = [
    {label: 'Новосибирск', value: 'Новосибирск'},
    {label: 'Москва', value: 'Москва'},
    {label: 'Санкт-Петербург', value: 'Санкт-Петербург'},
]

const handleCheckboxChange = (checked: boolean, key: number): void => {
    if (checked) selectedKey.value = key
    else selectedKey.value = null
}
</script>

<template>
    <DataTable
        :value="props.users"
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        data-key="key"
        paginator
    >
        <Column header-style="width: 3rem">
            <template #body="{ data }">
                <Checkbox
                    :model-value="selectedKey === data.key"
                    :disabled="selectedKey !== null"
                    binary
                    @update:model-value="(checked) => handleCheckboxChange(checked, data.key)"
                />
            </template>
        </Column>

        <Column field="name" header="Имя" header-class="w-[30%]">
            <template #body="{ data }">
                <div
                    v-if="data.key === selectedKey && userDraft"
                    class="h-9 -my-4 -mx-[13px] lg:-mx-[13px]"
                >
                    <InputText
                        v-model="userDraft.name"
                        placeholder="Введите имя"
                        class="w-full h-full"
                    />
                </div>
                <div v-else>
                    {{ data.name }}
                </div>
            </template>
        </Column>

        <Column field="age" header="Возраст" class="w-[30%]">
            <template #body="{ data }">
                <div
                    v-if="data.key === selectedKey && userDraft"
                    class="h-9 -mx-[13px] -my-4"
                >
                    <InputNumber
                        v-model="userDraft.age"
                        :min="1"
                        :max="150"
                        placeholder="Введите возраст"
                        class="w-full h-full"
                        input-class="w-[inherit]"
                    />
                </div>
                <div v-else>
                    {{ data.age }}
                </div>
            </template>
        </Column>

        <Column field="city" header="Город" class="w-[30%]">
            <template #body="{ data }">
                <div
                    v-if="data.key === selectedKey && userDraft"
                    class="h-9 -mx-[13px] -my-4"
                >
                    <Select
                        v-model="userDraft.city"
                        :options="cities"
                        option-label="label"
                        option-value="value"
                        placeholder="Выберите город"
                        class="w-full h-full"
                    />
                </div>
                <div v-else>
                    {{ data.city }}
                </div>
            </template>
        </Column>
    </DataTable>
</template>