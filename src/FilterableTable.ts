import type { App } from 'vue'
import { DummyButton, filterableTable } from './components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { storeDummyButton } from './components/dummy-button/store.js'
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { storeFilterableTable } from './components/filterable-table/store.js'
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Store } from 'vuex'
import PortalVue from 'portal-vue'
import './assets/tailwind.css'

export default {
  install: (app: App, options: { store: Store<unknown> } = { store: null }) => {
    options.store.registerModule('dummyButton', storeDummyButton)
    options.store.registerModule('filterableTable', storeFilterableTable)

    app.use(PortalVue)

    app.component('DummyButton', DummyButton)
    app.component('FilterableTable', filterableTable)

    /**
     * https://vuejs.org/guide/components/provide-inject.html#app-level-provide
     * Add app.provide when there is a value that should be passed/provided to be used in other components
     *
     * app.provide( key  'message', value  'hello!')
     *
     * then in another component you can do
     *
     * const message = inject('message')
     */
  }
}

export { DummyButton, filterableTable }
