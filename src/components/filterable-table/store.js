import { cloneDeep } from 'lodash'
import { merge } from 'lodash'

const DEFAULT_STATE = {
  options: {},
    totalItemsOnCurrentPage: 0,
    requestedPage: 1,
    selectedFilterOptions: [], // an array containing an object for each filter that has an array of selected options
    modalContent: {},
    sortDirection: ''
}

export const storeFilterableTable = {
  namespaced: true,
  
  state: {
    tableCount: 0,
    tables: {}
  },

  getters: {
    modalContent: state => id => {
      console.log(state.tables[id].modalContent)
      return state.tables[id].modalContent
    },
    options: state => id => {
      return state.tables[id].options
    },
    tableCount: state => state.tableCount,
  },

  actions: {
    applyNewFilterOptions ({ commit }, obj) {
      commit('updateFilterOptions', { 
        tableId: obj.tableId, 
        newOptions: obj.newOptions 
      })
      commit('updateRequestedPage', {
        tableId: obj.tableId, 
        requestedPage: obj.requestedPage
      })
    },
    createNewTable ({ commit }, id) {
      commit('createNewTable', id)
      commit('incrementTableCount')
    },
    setFilterOptions ({ commit }, obj) {
      console.log('setFilterOptions', obj.tableId)
      console.log('setFilterOptions', obj.filterOptions)
      commit('setFilterOptions', obj)
    },
    updateModal ({ commit }, obj) {
      commit('updateModal', obj)
    },
    updateOptions ({ commit }, options) {
      commit('updateOptions', options)
    },
    
  },
  
  mutations: {
    createNewTable (state, id) {
      state.tables[id] = cloneDeep(DEFAULT_STATE)
    },
    incrementTableCount (state) {
      state.tableCount = state.tableCount + 1
    },
    setFilterOptions (state, obj) {
      state.tables[obj.tableId].selectedFilterOptions = cloneDeep(obj.filterOptions)
    },
    updateFilterOptions (state, obj) {
      // const selectedFilterOptions = cloneDeep(state.tables[obj.tableId].selectedFilterOptions)

      // // find the correct filter to update
      // selectedFilterOptions.forEach(filter => {
      //   if(filter.name == obj.newOptions.filter){

      //     // replace filter options array with newOptions array
      //     filter.options = obj.newOptions.options
      //   }
      // })

      state.tables[obj.tableId].selectedFilterOptions = cloneDeep(merge(state.tables[obj.tableId].selectedFilterOptions, obj.newOptions))
      console.log(obj.newOptions)
      console.log(state.tables[obj.tableId].selectedFilterOptions)
      
    },
    updateOptions (state, obj) {
      state.tables[obj.id].options = cloneDeep(obj.options)
    },
    updateModal (state, obj) {
      state.tables[obj.id].modalContent = cloneDeep(obj.content)
    },
    updateRequestedPage (state, obj) {
      state.tables[obj.tableId].requestedPage = obj.requestedPage
    },




    

    updateTotalItemsOnCurrentPage (state, total) {
      state.totalItemsOnCurrentPage = total
    },

    

    

    clearFilterOptions (state) {
      state.selectedFilterOptions.forEach(filter => {
        filter.options = []
      })
    },

    removeFilterOption (state, removeOption) {
      state.selectedFilterOptions.forEach(filter => {
        if(filter.name == removeOption.name){ 
          filter.options.forEach(option => {
            if(option == removeOption.option){
              const index = filter.options.indexOf(removeOption.option)

              filter.options.splice(index, 1)
            }
          })
        }
      })
    },
    updateSortDirection (state, direction) {
      state.sortDirection = direction
    }
  }
}