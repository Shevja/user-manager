import type {User} from "@/types";
import {computed, ref, type Ref} from "vue";

export function useUserValidation(draft: Ref<User | null>) {
    const showErrors = ref(false);

    const errors = computed(() => {
        const d = draft.value;
        if (!d) return {};

        return showErrors.value
            ? {
                name: validateName(d.name),
                age: validateAge(d.age),
                city: d.city ? '' : 'Поле не должно быть пустым',
            }
            : {}
    })

    function validateName(name: string) {
        if (!name.trim()) return 'Поле не должно быть пустым'
        if (/[^\p{L}]/u.test(name)) return 'Поле не должно содержать цифры'
        return ''
    }

    function validateAge(age: number | null) {
        if (!age) return 'Поле не должно быть пустым';
        if (isNaN(age)) return 'Разрешены только числовые значения';
        if (age < 18) return 'Возраст должен быть больше 18';
        if (age > 200) return 'Возраст должен быть меньше 100';
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