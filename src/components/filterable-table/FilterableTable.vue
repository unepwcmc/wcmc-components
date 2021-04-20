<template>
  <div :style="cssVariables">
    <table-filters 
      :filters="filters" 
      :tableId="id"
      :total-items="totalItems"
    />

    <div class="table-head">
      <table-head 
        :headings="attributes"
        :options="optionsMerged"
        :tableId="id"
      />
    </div>
    <div class="table-body">
      <table-row v-for="item in items"
        :key="item._uid"
        :item="item" 
        :tableId="id"
      />
    </div>
  
    <table-pagination 
      :current-page="currentPage" 
      :items-per-page="itemsPerPage" 
      :tableId="id"
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
// import axios from 'axios'
// import { setAxiosHeaders } from './helpers/axios-helpers.js'
import { DEFAULT_OPTIONS, DUMMY_DATA } from './constants.js'

import { merge } from 'lodash'

import TableHead from './TableHead.vue'
import TableFilters from './TableFilters.vue'
import TableModal from './TableModal.vue'
import TablePagination from './TablePagination.vue'
import TableRow from './TableRow.vue'

import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

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
    endpoint: {
      type: String
    },
    options: {
      type: Object
    }
  },

  data () {
    return {
      id: '',
      attributes: [],
      filters: [],
      items: [],
      currentPage: 1,
      itemsPerPage: 2,
      totalItems: 5,
      totalPages: 3,
      optionsMerged: {},
      dummyData: DUMMY_DATA
    }
  },

  computed: {
    cssVariables () {
      return {
        '--font-family': this.config.fontFamily
      }
    },
    ...mapState({
      counter: state => state.filterableTable.counter
    }),
    ...mapGetters({
      tableCount: 'filterableTable/tableCount'
    }),
    config() {
      return this.$store.getters['filterableTable/options'](this.id)
    } 
  },

  created () {
    this.id = this.tableCount + 1
    this.$store.dispatch('filterableTable/createNewTable', this.id)
    this.importUserOptions()
  },

  mounted() {
    if(this.endpoint == undefined) {
      this.attributes = this.dummyData.attributes
      this.filters = this.dummyData.filters
      this.items = this.dummyData.items
    }
  },

  methods: {
    getNewItems () {
      // let data = {
      //   requested_page: this.$store.state.pame.requestedPage,
      //   filters: this.$store.state.pame.selectedFilterOptions
      // }

      // axiosSetHeaders()

      // axios.post(this.endpoint, data)
      // .then(response => {
      //   this.updateProperties(response.data)
      // })
      // .catch(function (error) {
      //   console.log(error)
      // })
    },
    importUserOptions () {
      const obj = {
        id: this.id,
        options: typeof(this.options) == 'object' ? merge({}, DEFAULT_OPTIONS, this.options) : DEFAULT_OPTIONS
      }

      this.$store.dispatch('filterableTable/updateOptions', obj)
    }
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