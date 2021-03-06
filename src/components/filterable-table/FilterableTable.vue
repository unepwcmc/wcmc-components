<template>
  <div :style="cssVariables">
    <table-filters 
      :endpoint-download="endpointDownload"
      :filters="filters" 
      :table-id="id"
      :total-items="totalItems"
    />

    <div class="table-head">
      <table-head 
        :headings="headings"
        :options="optionsMerged"
        :table-id="id"
      />
    </div>
    <div class="table-body">
      <table-row v-for="item in items"
        :key="item._uid"
        :item="item" 
        :table-id="id"
      />
    </div>
  
    <table-pagination 
      :current-page="currentPage" 
      :items-per-page="itemsPerPage" 
      :table-id="id"
      :total-items="totalItems" 
      :total-pages="totalPages"
      v-on:updated:page="getNewItems"
    />

    <table-modal 
      :tableId="id"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { setAxiosHeaders } from '../helpers/helpers-axios.js'

import { DEFAULT_OPTIONS, DUMMY_DATA } from './filterable-table/constants.js'

import { merge } from 'lodash'

import TableHead from './filterable-table/TableHead.vue'
import TableFilters from './filterable-table/TableFilters.vue'
import TableModal from './filterable-table/TableModal.vue'
import TablePagination from './filterable-table/TablePagination.vue'
import TableRow from './filterable-table/TableRow.vue'

import { mapState } from 'vuex'

export default {
  name: 'FilterableTable',

  components: { 
    TableHead,
    TableFilters,
    TableModal,
    TablePagination,
    TableRow 
  },

  props: {
    attributes: {
      type: Array,
    },
    endpoint: {
      type: String
    },
    endpointDownload: {
      type: String
    },
    filterArray: {
      type: Array
    },
    options: {
      type: Object
    }
  },

  data () {
    return {
      headings: [],
      currentPage: 1,
      dummyData: DUMMY_DATA,
      filters: [],
      id: '',
      items: [],
      itemsPerPage: 2,
      optionsMerged: {},
      totalItems: 5,
      totalPages: 3
    }
  },

  computed: {
    cssVariables () {
      return {
        '--font-family': this.config.fontFamily
      }
    },
    ...mapState({
      tableCount: state => state.filterableTable.tableCount
    }),
    config () {
      return this.$store.getters['filterableTable/options'](this.id)
    },
    requestedPage () {
      return this.$store.getters['filterableTable/getRequestedPage'](this.id)
    },
    selectedFilterOptions () {
      return this.$store.getters['filterableTable/getSelectedFilterOptions'](this.id)
    }
  },

  created () {
    this.id = this.tableCount + 1
    this.$store.dispatch('filterableTable/createNewTable', this.id)
    this.importUserOptions()
  },

  mounted() {
    if(this.endpoint == undefined) {
      this.headings = this.dummyData.attributes
      this.filters = this.dummyData.filters
    } else {
      this.headings = this.attributes
      this.filters = this.filterArray
    }

    this.$root.$on('getNewItems', this.getNewItems)

    this.createSelectedFilterOptions()

    if(this.endpoint == undefined) {
      this.items = this.dummyData.items
    } else {
      this.getNewItems()
    }
  },

  methods: {
    createSelectedFilterOptions () {
      // create an empty array for each filter
      const array = this.filters.map(filter => {
        if (filter.name !== undefined && filter.options.length > 0) {
          return {
            name: filter.name,
            options: [],
            type: filter.type
          }
        }
      })
      
      const obj = {
        tableId: this.id,
        filterOptions: array
      }

      this.$store.dispatch('filterableTable/setFilterOptions', obj)
    },
    getNewItems () {
      let data = {
        requested_page: this.requestedPage,
        filters: this.selectedFilterOptions
      }

      console.log('data', data)

      setAxiosHeaders(axios)

      axios.post(this.endpoint, data)
      .then(response => {
        this.updateProperties(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    importUserOptions () {
      const obj = {
        id: this.id,
        options: typeof(this.options) == 'object' ? merge({}, DEFAULT_OPTIONS, this.options) : DEFAULT_OPTIONS
      }

      this.$store.dispatch('filterableTable/updateOptions', obj)
    },
    updateProperties (data) {
      this.currentPage = data.current_page
      this.itemsPerPage = data.per_page
      this.totalItems = data.total_entries
      this.totalPages = data.total_pages
      this.items = data.items
    },
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.table {
  font-size: rem-calc(60);
  font-family: var(--font-family);
}
</style>