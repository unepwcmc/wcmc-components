import type { App } from 'vue'
import { DummyButton, filterableTable } from '@/components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { storeDummyButton } from '@/components/dummy-button/store.js'
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { storeFilterableTable } from '@/components/filterable-table/store.js'
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Store } from 'vuex'
import PortalVue from 'portal-vue'
import { createPinia } from 'pinia'
import { useWcmcComponentsMainStore } from '@/store/main'
import './assets/tailwind.css'
import type { useWcmcComponentsMainStoreType } from './types/store/main'

export default {
  install: (
    app: App,
    options: {
      store: Store<unknown> | null
    } = { store: null }
  ) => {
    options.store.registerModule('dummyButton', storeDummyButton)
    options.store.registerModule('filterableTable', storeFilterableTable)
    const pinia = createPinia()
    app.use(PortalVue)
    app.use(pinia)
    app.component('DummyButton', DummyButton)
    app.component('FilterableTable', filterableTable)
    app.provide<useWcmcComponentsMainStoreType>(
      'useWcmcComponentsMainStore',
      useWcmcComponentsMainStore()
    )
    /**
     * https://vuejs.org/guide/components/provide-inject.html#app-level-provide
     *  in your component use inject to update axios headers
     * const wcmcComponentsStore = inject<useWcmcComponentsMainStoreType>('useWcmcComponentsMainStore')
     */
  }
}

export { DummyButton, filterableTable }
