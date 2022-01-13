import Vue from 'vue'
import Serve from './Serve.vue'
import store from './store.js'
import ChartSunburst from '@/main.js'
import DummyButton from '@/main.js'
import FilterableTable from '@/main.js'

Vue.use(DummyButton, { store })
Vue.use(FilterableTable, { store })

Vue.config.productionTip = false

new Vue({
  store,
  components: {
    ChartSunburst
  },
  render: (h) => h(Serve),
}).$mount('#app')