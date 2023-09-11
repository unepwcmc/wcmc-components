import { createApp } from 'vue'
import App from './App.vue'
import FilterableTablePlugin from './FilterableTable'
import { createStore } from 'vuex'

const app = createApp(App)
const store = createStore({})
app.use(store)
app.use(FilterableTablePlugin, { store })
app.mount('#app')
