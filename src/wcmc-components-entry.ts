import type { App } from 'vue'
import { DummyButton, filterableTable } from '@/components'
import { storeDummyButton } from '@/components/dummy-button/store.js'
import { storeFilterableTable } from '@/components/FilterableTable/store.js'
import { Store } from 'vuex'
import PortalVue from 'portal-vue'
import './assets/tailwind.css'
import axios, { Axios } from 'axios'

export default {
  install: (
    app: App,
    options: {
      store: Store<unknown> | null
      axios: Axios | null
    } = { store: null, axios: null }
  ) => {
    options.store?.registerModule('dummyButton', storeDummyButton)
    options.store?.registerModule('filterableTable', storeFilterableTable)

    app.use(PortalVue)

    app.component('DummyButton', DummyButton)
    app.component('FilterableTable', filterableTable)

    app.provide<Axios>('filterTableAxios', options.axios ? options.axios : axios)
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
