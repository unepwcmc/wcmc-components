import ChartSunburst from './components/chart-sunburst/ChartSunburst.vue'
import DummyButton from './components/dummy-button/DummyButton.vue'
import FilterableTable from './components/filterable-table/FilterableTable.vue'

import { storeDummyButton } from './components/dummy-button/store.js'
import { storeFilterableTable } from './components/filterable-table/store.js'

import PortalVue from 'portal-vue'

// TODO make this DRY

export default {
  install (Vue, options) {
    if (!options || !options.store) {
      throw new Error('Please initialise plugin with a Vuex store.')
    }

    options.store.registerModule('dummyButton', storeDummyButton)
    options.store.registerModule('filterableTable', storeFilterableTable)
    
    Vue.use(PortalVue)
    
    Vue.component('chart-sunburst', ChartSunburst)
    Vue.component('dummy-button', DummyButton)
    Vue.component('filterable-table', FilterableTable)
  }
}

export {
  ChartSunburst,
  DummyButton,
  FilterableTable
}