import {createApp} from 'vue'
import '@/assets/styles/main.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import PrimeVueConfig from '@/config/primevue'

createApp(App)
    .use(PrimeVue, PrimeVueConfig)
    .mount('#app')
