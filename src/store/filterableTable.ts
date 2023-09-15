import { computed, ref } from 'vue'
import { defineStore, createPinia, setActivePinia } from 'pinia'

import type {
  TableConfig,
  HeadingAttributes,
  Endpoint,
  Filters,
  Options,
  HeadingSortBy,
  OptionsKeyType,
  OptionsValueType,
  Classes,
  ClassesKey,
  FindClassesObject
} from '@/types/FilterableTable/configTypes'

// type defaultState = {
//   modalContent: unknown
//   options: unknown
//   requestedPage: number
//   selectedFilterOptions: unknown[] // an array containing an object for each filter that has an array of selected options
//   selectedSort: {
//     column: string | null // column:string (the name of one of the table's columns)
//     ascending: boolean // ascending:boolean
//   }
//   totalItemsOnCurrentPage: number
// }
// function defaultState(): defaultState {
//   return {
//     modalContent: {},
//     options: {},
//     requestedPage: 1,
//     selectedFilterOptions: [], // an array containing an object for each filter that has an array of selected options
//     selectedSort: {
//       column: null, // column:string (the name of one of the table's columns)
//       ascending: true // ascending:boolean
//     },
//     totalItemsOnCurrentPage: 0
//   }
// }

setActivePinia(createPinia())

export function defaultOptions(): Options {
  return {
    showEdit: false,
    showArchived: false,
    showMoreContentColumn: true,
    text: {}
  }
}

export function useFilterableTableStore(tableId: string) {
  return defineStore(`filterableTable${tableId}`, () => {
    /*
     ** Config related variables
     */
    const attributes = ref<HeadingAttributes[]>([])
    const endpoint = ref<Endpoint>('')
    const filters = ref<Filters[]>([])
    const options = ref<Options>(defaultOptions())
    const classes = ref<Classes>({})
    const tableConfig = computed(() => {
      return {
        attributes,
        endpoint,
        filters,
        options,
        classes
      }
    })
    // const selectedSort = ref({
    //   column: null, // column:string (the name of one of the table's columns)
    //   ascending: true // ascending:boolean
    // })

    function updateTableConfig({
      attributes: _attributes,
      endpoint: _endpoint,
      filters: _filters,
      options: _options,
      classes: _classes
    }: TableConfig) {
      if (attributes) attributes.value = _attributes
      if (endpoint) endpoint.value = _endpoint
      if (filters) filters.value = _filters
      if (options) options.value = _options
      if (classes) classes.value = _classes
    }
    function updateOptionsElement(key: OptionsKeyType, value: OptionsValueType) {
      options.value[key] = value
    }

    const headersInfomation = computed(() => {
      // Filter out the headers that should not be shown/disable by users in the table
      const headersForTable = attributes.value.filter((attribute) => {
        return attribute.showIn !== 'modal'
      })

      // if showArchived ,showMoreContentColumn are true then it will return 2 + length of the attributes
      const headersLength =
        headersForTable.length +
        [
          options.value.showArchived,
          options.value.showEdit,
          options.value.showMoreContentColumn
        ].filter((extraColumn) => extraColumn === true).length
      return {
        headersForTable,
        headersLength
      }
    })
    function findCustomClassName(targetClass: ClassesKey) {
      try {
        return classes.value[targetClass]
      } catch {
        return null
      }
    }

    function updateTableSorting(field: string, sortingOrder: HeadingSortBy) {
      let tableSortingSettingsUpdated = false
      attributes.value = attributes.value.filter((attribute) => {
        if (attribute.field === field) {
          console.log(sortingOrder)
          attribute.sortingOrder = sortingOrder
          tableSortingSettingsUpdated = true
        }
        return true
      })
      return tableSortingSettingsUpdated
    }
    function getAText(key: string) {
      return options.value.text
        ? options.value.text[key]
        : `The key of ${key} is not recognised or you did not pass the text parameter in options`
    }

    function getNewItems() {
      console.log('Get New Items in pinia is called')
      // items.value = [

      // ]
      // const data = {
      //   filters: this.selectedFilterOptions(this.id),
      //   items_per_page: this.itemsPerPage,
      //   requested_page: this.requestedPage(this.id)
      // }

      // if (this.isSortable(this.id)) {
      //   data.sort = this.selectedSort(this.id)
      // }

      // setAxiosHeaders(axios)

      // axios
      //   .post(this.endpoint, data)
      //   .then((response) => {
      //     console.log(response.data)
      //     this.updateProperties(response.data)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    }

    return {
      classes,
      options,
      config: tableConfig,
      headersInfomation,
      findCustomClassName,
      initTable: updateTableConfig,
      updateTableConfig,
      updateTableSorting,
      updateOptionsElement,
      getNewItems,
      getAText
    }
  })()
}

// export const storeFilterableTable = {
//   getters: {
//     modalContent: (state) => (id) => {
//       return state.tables[id].modalContent
//     },

//     options: (state) => (id) => {
//       return state.tables[id].options
//     },

//     isSortable: (_state, getters) => (id) => {
//       return getters.options(id).sortable
//     },

//     getRequestedPage: (state) => (id) => {
//       return state.tables[id].requestedPage
//     },

//     getSelectedFilterOptions: (state) => (id) => {
//       return state.tables[id].selectedFilterOptions
//     },

//     getSelectedSort: (state) => (id) => {
//       return state.tables[id].selectedSort
//     },

//     isMoreContentColumnDisplayed: (state) => (id) => {
//       return !state.tables[id].options.hideMoreContentColumn
//     }
//   },

//   actions: {
//     applyNewFilterOptions({ commit }, obj) {
//       commit('updateFilterOptions', {
//         tableId: obj.tableId,
//         newOptions: obj.newOptions
//       })

//       commit('updateRequestedPage', {
//         tableId: obj.tableId,
//         requestedPage: obj.requestedPage
//       })

//       commit('updateSelectedSort', {
//         tableId: obj.tableId,
//         sortObj: obj.sortObj
//       })
//     },

//     createNewTable({ commit }, id) {
//       commit('createNewTable', id)
//       commit('incrementTableCount')
//     },

//     setFilterOptions({ commit }, obj) {
//       commit('setFilterOptions', obj)
//     },

//     updateModal({ commit }, obj) {
//       commit('updateModal', obj)
//     },

//     updateOptions({ commit }, options) {
//       commit('updateOptions', options)
//     },

//     updateRequestedPage({ commit }, obj) {
//       commit('updateRequestedPage', obj)
//     },

//     updateSelectedSort({ commit }, obj) {
//       commit('updateSelectedSort', obj)
//     }
//   },

//   mutations: {
//     createNewTable(state, id) {
//       state.tables[id] = cloneDeep(DEFAULT_STATE)
//       // Vue.set(state.tables, id, cloneDeep(DEFAULT_STATE)) // Vue.set ensures reactivity of new table
//     },

//     incrementTableCount(state) {
//       state.tableCount = state.tableCount + 1
//     },

//     setFilterOptions(state, obj) {
//       state.tables[obj.tableId].selectedFilterOptions = cloneDeep(obj.filterOptions)
//     },

//     updateFilterOptions(state, obj) {
//       state.tables[obj.tableId].selectedFilterOptions.map((filter) => {
//         if (filter.name == obj.newOptions.name) {
//           filter.options = obj.newOptions.options
//         }

//         return filter
//       })
//     },

//     updateOptions(state, obj) {
//       state.tables[obj.tableId].options = cloneDeep(obj.options)
//     },

//     updateModal(state, obj) {
//       state.tables[obj.tableId].modalContent = cloneDeep(obj.content)
//     },

//     updateRequestedPage(state, obj) {
//       state.tables[obj.tableId].requestedPage = cloneDeep(obj.requestedPage)
//     },

//     updateTotalItemsOnCurrentPage(state, total) {
//       state.totalItemsOnCurrentPage = total
//     },

//     updateSelectedSort(state, { tableId, sortObj }) {
//       state.tables[tableId].selectedSort = cloneDeep(sortObj)
//     }
//   }
// }
