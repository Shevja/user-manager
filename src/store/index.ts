import {defineStore} from "pinia";

interface User {
    key: number;
    name: string;
    age: number;
    city: string;
}

export const useUserStore = defineStore('user-manager', {
    state: () => ({
        users: [
            {key: 1, name: 'Иван', age: 25, city: 'Новосибирск'},
        ]
    }),
    actions: {
        setUser(user: User) {
            const newKey = this.users.length > 0
                ? Math.max(...this.users.map(u => u.key)) + 1
                : 1

            this.users.unshift({...user, key: newKey});
        },
        updateUser(updatedUser: User) {
            const userIndex = this.users.findIndex(u => u.key === updatedUser.key);

            if (userIndex !== -1) {
                this.users[userIndex] = {...updatedUser}
            }
        },
        deleteUser(user: User) {
            this.users = this.users.filter(u => u.key !== user.key)
        },
    }
})