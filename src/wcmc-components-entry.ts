import type { App } from 'vue'
import { DummyButton, filterableTable, ArchiveButton } from '@/components'
import { storeDummyButton } from '@/components/dummy-button/store.js'
import { storeFilterableTable } from '@/components/filterable-table/store.js'
import { Store } from 'vuex'
import PortalVue from 'portal-vue'
import './assets/tailwind.css'
// import '@/wcmc-components-types'

export default {
  install: (
    app: App,
    options: {
      store: Store<unknown> | null
    } = { store: null }
  ) => {
    options.store?.registerModule('dummyButton', storeDummyButton)
    options.store?.registerModule('filterableTable', storeFilterableTable)

    app.use(PortalVue)
    console.log('Hi')

    app.component('DummyButton', DummyButton)
    app.component('FilterableTable', filterableTable)
    app.component('ArchiveButton', ArchiveButton)
    // app.provide<string>('keyForTheProvide', 'AnyValue')
    /**
     * https://vuejs.org/guide/components/provide-inject.html#app-level-provide
     *  in your component use inject to update axios headers
     * const thingsToInject = inject< Type >('keyForTheProvide')
     */
  }
}

// export components
export { DummyButton, filterableTable }
// Export types
export * from '@/wcmc-components-types'
