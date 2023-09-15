import { createApp } from 'vue'
import App from '@/App.vue'
import FilterableTablePlugin from './wcmc-components-entry'
import { createStore } from 'vuex'
import { createPinia } from 'pinia'

const app = createApp(App)
const store = createStore({})
const pinia = createPinia()

app.use(store)

app.use(FilterableTablePlugin, { store, axios: null })
app.mount('#app')
