import {defineStore} from "pinia";
import {ref, toRaw, watch} from "vue";
import type {User} from "@/types";

export const useUserStore = defineStore('user-manager', () => {
    const users = ref<User[]>([
        {key: 1, name: 'Иван', age: 25, city: 'Новосибирск'},
        {key: 2, name: 'Андрей', age: 25, city: 'Новосибирск'},
        {key: 3, name: 'Кирилл', age: 25, city: 'Новосибирск'},
        {key: 4, name: 'Юрий', age: 25, city: 'Новосибирск'},
        {key: 5, name: 'Вениамин', age: 25, city: 'Новосибирск'},
        {key: 6, name: 'Инокентий', age: 25, city: 'Новосибирск'},
    ])
    const draftUser = ref<User | null>(null);
    const selectedKey = ref<number | null>(null);

    // Базовые экшны (Сохранение, Обновление, Удаление)
    function saveUser(user: User) {
        const newKey = users.value.length > 0
            ? Math.max(...users.value.map(u => u.key)) + 1
            : 1

        users.value.unshift({...user, key: newKey});
    }

    function updateUser(updatedUser: User) {
        const userIndex = users.value.findIndex(u => u.key === updatedUser.key);

        if (userIndex !== -1) {
            users.value[userIndex] = {...updatedUser}
        }

        resetSelection()
    }

    function deleteUser(key: number) {
        users.value = users.value.filter(u => u.key !== key)
        resetSelection()
    }

    // Доп. экшны (Сброс выбора, Установка выбора, Создание/Обновление пустого шаблона)
    function resetSelection() {
        selectedKey.value = null
        draftUser.value = null
    }

    function selectUser(key: number | null) {
        if (key === null) {
            resetSelection()
            return;
        }

        selectedKey.value = key
        const user = users.value.find(u => u.key === key);
        draftUser.value = user ? structuredClone(toRaw(user)) : null;
    }

    // Создать шаблон для заполнения данных в списке
    function createDraftUser() {
        const newDraftUser: User = {
            key: -1,
            age: null,
            name: '',
            city: '',
        }

        users.value.unshift(newDraftUser);
        draftUser.value = newDraftUser;
        selectedKey.value = newDraftUser.key;
    }

    function updateDraftUser(newDraft: User | null) {
        if (!newDraft) return
        draftUser.value = { ...draftUser.value, ...newDraft };
    }

    watch(
        users,
        (newUsers) => {
            console.log('users обновился', newUsers);
        }
    )

    return {
        users,
        draftUser,
        selectedKey,
        saveUser,
        updateUser,
        deleteUser,
        resetSelection,
        selectUser,
        createDraftUser,
        updateDraftUser
    }
})