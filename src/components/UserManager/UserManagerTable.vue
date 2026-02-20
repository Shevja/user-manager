<script setup lang="ts">
import type {User} from "@/types";
import type {UserManagerTableProps} from "@/components/UserManager/UserManagerTable.types.ts";
import {
    Column,
    DataTable,
    InputText,
    InputNumber,
    Checkbox,
    Select
} from "primevue";

const props = defineProps<UserManagerTableProps>()

const userDraft = defineModel<User | null>('userDraft', {default: null})
const selectedKey = defineModel<number | null>('selectedKey', {default: null})

const cities = [
    {label: 'Новосибирск', value: 'Новосибирск'},
    {label: 'Москва', value: 'Москва'},
    {label: 'Санкт-Петербург', value: 'Санкт-Петербург'},
]
</script>

<template>
    <DataTable
        :value="props.users"
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
        data-key="key"
        paginator
        showGridlines
        table-class="table-fixed min-w-xl"
    >
        <Column header-class="w-13" body-class="w-13">
            <template #body="{ data }">
                <Checkbox
                    :model-value="selectedKey === data.key"
                    :disabled="selectedKey !== null"
                    binary
                    @update:model-value="(checked) => { selectedKey = checked ? data.key : null }"
                />
            </template>
        </Column>

        <Column field="name" header="Имя" header-class="w-1/3" body-class="p-0">
            <template #body="{ data }">
                <div
                    v-if="data.key === selectedKey && userDraft"
                    class="m-[3px] h-full relative"
                >
                    <InputText
                        :model-value="userDraft.name"
                        class="w-full h-9"
                        placeholder="Введите имя"
                        :invalid="!!props.draftErrors?.name"
                        @update:model-value="value => userDraft = {...userDraft, name: value} as User"
                    />
                    <div class="text-red-600 text-xs/3.5">
                        {{props.draftErrors.name}}
                    </div>
                </div>
                <div class="px-4 py-3" v-else>
                    {{ data.name }}
                </div>
            </template>
        </Column>

        <Column field="age" header="Возраст" header-class="w-1/3" body-class="p-0">
            <template #body="{ data }">
                <div
                    v-if="data.key === selectedKey && userDraft"
                    class="m-[3px] h-full"
                >
                    <InputNumber
                        :model-value="userDraft.age"
                        placeholder="Введите возраст"
                        class="w-full h-full"
                        input-class="w-full h-9"
                        :min="1"
                        :max="150"
                        :invalid="!!props.draftErrors?.age"
                        @update:model-value="value => userDraft = {...userDraft, age: value} as User"
                    />
                    <div class="text-red-600 text-xs/3.5">
                        {{props.draftErrors.age}}
                    </div>
                </div>
                <div class="px-4 py-3" v-else>
                    {{ data.age }}
                </div>
            </template>
        </Column>

        <Column field="city" header="Город" header-class="w-1/3" body-class="p-0">
            <template #body="{ data }">
                <div
                    v-if="data.key === selectedKey && userDraft"
                    class="m-[3px] h-full"
                >
                    <Select
                        :model-value="userDraft.city"
                        :options="cities"
                        option-label="label"
                        option-value="value"
                        placeholder="Выберите город"
                        class="w-full h-9 flex items-center"
                        :invalid="!!props.draftErrors.city"
                        @update:model-value="value => userDraft = {...userDraft, city: value} as User"
                    />
                    <div class="text-red-600 text-xs/3.5">
                        {{props.draftErrors.city}}
                    </div>
                </div>
                <div class="px-4 py-3" v-else>
                    {{ data.city }}
                </div>
            </template>
        </Column>
    </DataTable>
</template>