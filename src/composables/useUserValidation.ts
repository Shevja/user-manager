import type {User} from "@/types";
import {computed, type Ref} from "vue";

export function useUserValidation(draft: Ref<User | null>) {
    const errors = computed(() => {
        const d = draft.value;
        if (!d) return {};

        return {
            name: !d.name.trim() ? 'Поле не должно быть пустым' : '',
            age: d.age === null ? 'Поле не должно быть пустым' : '',
            city: !d.city ? 'Поле не должно быть пустым' : '',
        }
    })

    function isValid() {
        return Object.values(errors.value).every(err => err === '')
    }

    return {
        errors,
        isValid,
    }
}