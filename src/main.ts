import {createApp} from 'vue'
import '@/assets/styles/main.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import PrimeVueConfig from '@/config/primevue'
import {createPinia} from "pinia";
import {ToastService} from "primevue";

const pinia = createPinia()

createApp(App)
    .use(PrimeVue, PrimeVueConfig)
    .use(pinia)
    .use(ToastService)
    .mount('#app')
