import { cloneDeep } from 'lodash'
import Vue from 'vue'

const DEFAULT_STATE = {
  modalContent: {},
  options: {},
  requestedPage: 1,
  selectedFilterOptions: [], // an array containing an object for each filter that has an array of selected options
  selectedSort: {
    column: null, // column:string (the name of one of the table's columns)
    ascending: true // ascending:boolean
  },
  totalItemsOnCurrentPage: 0,
}

export const storeFilterableTable = {
  namespaced: true,
  
  state: {
    tableCount: 0,
    tables: {}
  },

  getters: {
    modalContent: state => id => {
      return state.tables[id].modalContent
    },

    options: state => id => {
      return state.tables[id].options
    },

    isSortable: (_state, getters) => id => {
      return getters.options(id).sortable
    },

    getRequestedPage: state => id => {
      return state.tables[id].requestedPage
    },

    getSelectedFilterOptions: state => id => {
      return state.tables[id].selectedFilterOptions
    },

    getSelectedSort: state => id => {
      return state.tables[id].selectedSort
    }
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

      commit('updateSelectedSort', {
        tableId: obj.tableId,
        sortObj: obj.sortObj
      })
    },

    createNewTable ({ commit }, id) {
      commit('createNewTable', id)
      commit('incrementTableCount')
    },

    setFilterOptions ({ commit }, obj) {
      commit('setFilterOptions', obj)
    },

    updateModal ({ commit }, obj) {
      commit('updateModal', obj)
    },

    updateOptions ({ commit }, options) {
      commit('updateOptions', options)
    },

    updateRequestedPage ({ commit }, obj) {
      commit('updateRequestedPage', obj)
    },

    updateSelectedSort ( { commit }, obj) {
      commit('updateSelectedSort', obj)
    }
  },
  
  mutations: {
    createNewTable (state, id) {
      Vue.set(state.tables, id, cloneDeep(DEFAULT_STATE)) // Vue.set ensures reactivity of new table
    },

    incrementTableCount (state) {
      state.tableCount = state.tableCount + 1
    },

    setFilterOptions (state, obj) {
      state.tables[obj.tableId].selectedFilterOptions = cloneDeep(obj.filterOptions)
    },

    updateFilterOptions (state, obj) {
      state.tables[obj.tableId].selectedFilterOptions.map(filter => {
        if(filter.name == obj.newOptions.name) {
          filter.options = obj.newOptions.options
        }

        return filter
      })
    },

    updateOptions (state, obj) {
      state.tables[obj.tableId].options = cloneDeep(obj.options)
    },

    updateModal (state, obj) {
      state.tables[obj.tableId].modalContent = cloneDeep(obj.content)
    },

    updateRequestedPage (state, obj) {
      state.tables[obj.tableId].requestedPage = cloneDeep(obj.requestedPage)
    },

    updateTotalItemsOnCurrentPage (state, total) {
      state.totalItemsOnCurrentPage = total
    },

    updateSelectedSort (state, { tableId, sortObj }) {
      state.tables[tableId].selectedSort = cloneDeep(sortObj)
    }
  }
}