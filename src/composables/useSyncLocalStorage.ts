import {type Ref, toRaw, watch} from "vue";

export function useSyncLocalStorage<T>(key: string, state: Ref<T>) {
    const savedState = localStorage.getItem(key)

    if (savedState) {
        try {
            state.value = JSON.parse(savedState)
        } catch (e) {
            console.error(`useSyncLocalStorage: Не удалось распарсить значение по ключу "${key}":`, e)
        }
    }

    watch(
        state,
        (newValue) => {
            try {
                const stateObj = toRaw(newValue)
                localStorage.setItem(key, JSON.stringify(stateObj))
                console.log("LS обновился")
            } catch (e) {
                console.error("Ошибка записи в LocalStorage: ", e)
            }
        },
        {deep: true}
    )
}