import {defineStore} from "pinia";
import {computed, ref, toRaw} from "vue";
import type {User} from "@/types";
import {useSyncLocalStorage} from "@/composables/useLocalStorage.ts";

export const useUserStore = defineStore('user-manager', () => {
    const users = ref<User[]>([
        {key: 1, name: 'Иван', age: 25, city: 'Новосибирск'},
    ])
    const draftUser = ref<User | null>(null);
    const selectedKey = ref<number | null>(null);
    const isCreateMode = ref(false);

    const userCities = ref([
        {label: 'Новосибирск', value: 'Новосибирск'},
        {label: 'Москва', value: 'Москва'},
        {label: 'Санкт-Петербург', value: 'Санкт-Петербург'},
    ])

    // Синхронизируем users с localStorage
    useSyncLocalStorage("user-manager-list", users);

    // Базовые экшны (Сохранение, Обновление, Удаление)
    function saveUser(user: User) {
        const newKey = Date.now()

        users.value.push({...user, key: newKey});
        isCreateMode.value = false;
        resetSelect()
    }

    function updateUser(updatedUser: User) {
        const userIndex = users.value.findIndex(u => u.key === updatedUser.key);

        if (userIndex !== -1) {
            users.value[userIndex] = {...updatedUser}
        }
        resetSelect()
    }

    function deleteUser(key: number) {
        users.value = users.value.filter(u => u.key !== key)

        // Для универсальности, если удаление будет по другому ключу
        if (selectedKey.value === key) resetSelect()
    }

    // Доп. экшны (Сброс выбора, Установка выбора, Создание/Обновление пустого шаблона)
    function resetSelect() {
        selectedKey.value = null
        draftUser.value = null
    }

    function selectUser(key: number | null) {
        if (key === null) {
            resetSelect()
            return;
        }

        const user = users.value.find(u => u.key === key);

        if (user) {
            selectedKey.value = key;
            draftUser.value = structuredClone(toRaw(user));
        }
    }

    // Создать шаблон для заполнения данных в списке
    function createDraftUser() {
        const newDraftUser = {
            key: -1,
            age: null,
            name: '',
            city: '',
        } as User;

        isCreateMode.value = true;
        draftUser.value = newDraftUser;
        selectedKey.value = newDraftUser.key;
    }

    function updateDraftUser(newDraft: User) {
        draftUser.value = {...draftUser.value, ...newDraft};
    }

    // Геттеры
    const displayUsers = computed(() => {
        const list = [...users.value]

        // Добавляем шаблон пользователя в список
        if (draftUser.value && isCreateMode.value) {
            list.push(draftUser.value)
        }

        return list.reverse()
    })

    return {
        users,
        draftUser,
        selectedKey,
        isCreateMode,
        userCities,
        saveUser,
        updateUser,
        deleteUser,
        resetSelect,
        selectUser,
        createDraftUser,
        updateDraftUser,
        displayUsers
    }
})