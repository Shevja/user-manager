import type {User} from "@/types";
import {computed, ref, type Ref} from "vue";

export function useUserValidation(draft: Ref<User | null>) {
    const showErrors = ref(false);

    const errors = computed(() => {
        const d = draft.value;
        if (!d) return {};

        return showErrors.value
            ? {
                name: d.name.trim() ? '' : 'Поле не должно быть пустым',
                age: validateAge(d.age),
                city: d.city ? '' : 'Поле не должно быть пустым',
            }
            : {}
    })

    function validateAge(age: number | null) {
        if (!age) return 'Поле не должно быть пустым';
        if (isNaN(age)) return 'Разрешены только числовые значения';
        if (age < 18) return 'Возраст должен быть больше 18';
        if (age > 100) return 'Возраст должен быть меньше 100';
        return ''
    }

    const isValid = computed(() => {
        return Object.values(errors.value).every(err => err === '')
    })

    return {
        errors,
        isValid,
        showErrors
    }
}