<template>
  <div :style="cssVariables">
    <table-filters 
      :endpoint-download="endpointDownload"
      :filters="filters"
      :legends="legends"
      :table-id="id"
      :total-items="totalItems"
    />

    <div class="table-head">
      <table-head 
        :headings="headings"
        :table-id="id"
        :totalColumns="totalColumns"
      />
    </div>
    <div class="table-body">
      <template v-if="hasItems">
        <table-row v-for="item in items"
          :key="item._uid"
          :item="item" 
          :table-id="id"
          :totalColumns="totalColumns"
        />
      </template>
      <template v-else>
        <div class="table-body__placeholder">
          {{ config.text.noResultsMessage }}
        </div>
      </template>
    </div>

    <table-pagination 
      v-if="hasItems"
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
import { setAxiosHeaders } from '../../helpers/helpers-axios.js'

import { DEFAULT_OPTIONS, DUMMY_DATA } from './constants.js'

import { merge } from 'lodash'

import TableHead from './TableHead.vue'
import TableFilters from './TableFilters.vue'

import TableModal from './TableModal.vue'
import TablePagination from './TablePagination.vue'
import TableRow from './TableRow.vue'

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
    legendArray: {
      type: Array
    },
    itemsPerPage: {
      default: 10,
      type: Number
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
      legends: [],
      id: '',
      items: [],
      noResultsMessage: '',
      totalColumns: 0,
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
    hasItems () {
      return this.items.length > 0
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
      this.legends = this.dummyData.legends
    } else {
      this.headings = this.attributes
      this.filters = this.filterArray
      this.legends = this.legendArray
    }

    this.$root.$on('getNewItems', this.getNewItems)

    this.createSelectedFilterOptions()

    if(this.endpoint == undefined) {
      this.items = this.dummyData.items
    } else {
      this.getNewItems()
    }

    this.getTotalTableColumns()
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
        filters: this.selectedFilterOptions,
        items_per_page: this.itemsPerPage,
        requested_page: this.$store.getters['filterableTable/getRequestedPage'](this.id)
      }

      setAxiosHeaders(axios)

      axios.post(this.endpoint, data)
      .then(response => {
        this.updateProperties(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getTotalTableColumns () {
      //Add an additional column for the "View more" button
      if(this.headings.length > 0) {
        this.totalColumns = this.headings.length + 1
      }
    },
    importUserOptions () {
      const obj = {
        tableId: this.id,
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

.cloak { display: none; }

.table {
  font-family: Arial, sans-serif; // IE11
  font-family: var(--font-family);

  &-body__placeholder {
    font-size: rem-calc(18);
    font-family: Arial, sans-serif; // IE11
    font-family: var(--font-family);
    padding: rem-calc(60 0 100 0);
    text-align: center;
  }
}
</style>