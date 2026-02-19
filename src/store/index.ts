import {defineStore} from "pinia";
import {ref, toRaw, watch} from "vue";
import type {User} from "@/types";

export const useUserStore = defineStore('user-manager', () => {
    const users = ref([
        {key: 1, name: 'Иван', age: 25, city: 'Новосибирск'},
        {key: 2, name: 'Андрей', age: 25, city: 'Новосибирск'},
        {key: 3, name: 'Кирилл', age: 25, city: 'Новосибирск'},
        {key: 4, name: 'Юрий', age: 25, city: 'Новосибирск'},
        {key: 5, name: 'Вениамин', age: 25, city: 'Новосибирск'},
        {key: 6, name: 'Инокентий', age: 25, city: 'Новосибирск'},
    ])
    const userDraft = ref(null)

    function setUser(user: User) {
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
    }

    function deleteUser(user: User) {
        users.value = users.value.filter(u => u.key !== user.key)
    }

    function getUserDraft(key: number): User | null {
        const user = users.value.find(u => u.key === key);
        return user ? structuredClone(toRaw(user)) : null;
    }

    watch(
        users,
        (newUsers) => {
            console.log('users обновился', newUsers);
        }
    )

    return {
        users,
        userDraft,
        setUser,
        updateUser,
        deleteUser,
        getUserDraft,
    }
})