<template>
  <archive-button />
  <br />
  <br />
  <div :style="cssVariables">
    <div class="justify-center flex bg-yellow-300 items-center">
      <div class="text-4xl">Tailwind is working</div>
    </div>
    <portal to="sort-icon">
      <slot name="sort-icon" />
    </portal>

    <portal to="row-link-icon">
      <slot name="row-link-icon" />
    </portal>

    <div
      v-if="shouldRenderNewRecordButton"
      class="buttons"
    >
      <new-record-button :table-id="id" />
    </div>

    <table-filters
      :endpoint-download="endpointDownload"
      :filters="filters"
      :legends="legends"
      :table-id="id"
      :total-items="totalItems"
      @getNewItems="getNewItems"
    />

    <div class="table-head">
      <table-head
        :headings="headings"
        :table-id="id"
        :total-columns="totalColumns"
        @getNewItems="getNewItems"
      />
    </div>

    <div class="table-body">
      <template v-if="hasItems">
        <table-row
          v-for="(item, itemIndex) in items"
          :key="item._uid"
          :item="item"
          :item-index="itemIndex"
          :table-id="id"
          :total-columns="totalColumns"
          @openModal="openModal"
        />
      </template>

      <template v-else>
        <div
          class="table-body__placeholder"
          v-text="noResultsMessage"
        />
      </template>
    </div>

    <table-pagination
      v-if="hasItems"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :table-id="id"
      :total-items="totalItems"
      :total-pages="totalPages"
      @updated:page="getNewItems"
    />

    <table-modal
      :table-id="id"
      :config="modalConfig"
      :modalContent="modalContent"
      @openModal="openModal"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { merge } from 'lodash'
import { createNamespacedHelpers } from 'vuex'

import { DEFAULT_OPTIONS, DUMMY_DATA } from './constants.js'
import { setAxiosHeaders } from '../../helpers/helpers-axios.js'

import NewRecordButton from './NewRecordButton.vue'
import TableHead from './TableHead.vue'
import TableFilters from './TableFilters.vue'
import TableModal from './TableModal.vue'
import TablePagination from './TablePagination.vue'
import TableRow from './TableRow.vue'
import ArchiveButton from './ArchiveButton.vue'

const { mapState, mapGetters, mapActions } = createNamespacedHelpers('filterableTable')

export default {
  name: 'FilterableTable',

  components: {
    NewRecordButton,
    TableHead,
    TableFilters,
    TableModal,
    TablePagination,
    TableRow,
    ArchiveButton
  },

  props: {
    attributes: {
      type: Array
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

    itemsPerPage: {
      default: 10,
      type: Number
    },

    legendArray: {
      type: Array
    },

    options: {
      type: Object
    }
  },

  data() {
    return {
      headings: [],
      currentPage: 1,
      dummyData: DUMMY_DATA,
      filters: [],
      legends: [],
      id: '',
      items: [],
      totalColumns: 0,
      totalItems: 5,
      totalPages: 3,
      modalConfig: undefined,
      modalContent: {},
      isActive: false
    }
  },

  computed: {
    ...mapState({
      tableCount: (state) => state.tableCount
    }),

    ...mapGetters({
      config: 'options',
      isSortable: 'isSortable',
      requestedPage: 'getRequestedPage',
      selectedFilterOptions: 'getSelectedFilterOptions',
      selectedSort: 'getSelectedSort',
      isMoreContentColumnDisplayed: 'isMoreContentColumnDisplayed'
    }),

    cssVariables() {
      return {
        '--font-family': this.config(this.id).fontFamily
      }
    },

    hasItems() {
      return this.items.length > 0
    },

    noResultsMessage() {
      return this.config(this.id).text.noResultsMessage
    },

    shouldRenderNewRecordButton() {
      return this.config(this.id).newRecordLink.url != null
    }
  },

  created() {
    this.id = this.tableCount + 1
    this.createNewTable(this.id)
    this.importUserOptions()
  },

  mounted() {
    if (this.endpoint == undefined) {
      this.headings = this.dummyData.attributes
      this.filters = this.dummyData.filters
      this.legends = this.dummyData.legends
    } else {
      this.headings = this.attributes
      this.filters = this.filterArray
      this.legends = this.legendArray
    }

    // this.$root.$on("getNewItems", this.getNewItems);

    this.createSelectedFilterOptions()

    if (this.endpoint == undefined) {
      this.items = this.dummyData.items
    } else {
      this.getNewItems()
    }

    this.getTotalTableColumns()
  },

  methods: {
    ...mapActions(['createNewTable', 'setFilterOptions', 'updateOptions']),

    createSelectedFilterOptions() {
      // create an empty array for each filter
      const array = this.filters.map((filter) => {
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

      this.setFilterOptions(obj)
    },

    getNewItems() {
      const data = {
        filters: this.selectedFilterOptions(this.id),
        items_per_page: this.itemsPerPage,
        requested_page: this.requestedPage(this.id)
      }

      if (this.isSortable(this.id)) {
        data.sort = this.selectedSort(this.id)
      }

      setAxiosHeaders(axios)

      axios
        .post(this.endpoint, data)
        .then((response) => {
          console.log(response.data)
          this.updateProperties(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    getTotalTableColumns() {
      if (this.headings.length < 1) {
        return
      }

      this.totalColumns = this.headings.length

      this.totalColumns += [
        this.isMoreContentColumnDisplayed(this.id),
        this.config(this.id).showArchived,
        this.config(this.id).showEdit
      ].filter(Boolean).length
    },

    importUserOptions() {
      const providedOptions = typeof this.options == 'object' ? this.options : {}

      const defaultOptionsWithoutColumns = JSON.parse(JSON.stringify(DEFAULT_OPTIONS))
      delete defaultOptionsWithoutColumns.columns // remove default columns widths which was messing the vertical alignment

      const defaultOptionsToMerge = Object.prototype.hasOwnProperty.call(providedOptions, 'columns')
        ? defaultOptionsWithoutColumns
        : DEFAULT_OPTIONS

      const options = merge(defaultOptionsToMerge, providedOptions)
      const obj = {
        tableId: this.id,
        options
      }

      this.updateOptions(obj)
    },

    updateProperties(data) {
      this.currentPage = data.current_page
      this.itemsPerPage = data.per_page
      this.totalItems = data.total_entries
      this.totalPages = data.total_pages
      this.items = data.items
    },
    openModal({ tableId }) {
      if (this.tableId !== tableId) {
        return false
      }

      this.modalConfig = this.$store.getters['filterableTable/options'](this.tableId)

      this.modalContent = this.$store.getters['filterableTable/modalContent'](this.tableId)

      this.isActive = true
    },
    closeModal() {
      this.isActive = false
    }
  },

  beforeUnmount() {
    // this.$root.$off("openModal", this.onOpenModal);
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.buttons {
  margin-bottom: 10px;
  height: 50px;
  display: flex;
}

.cloak {
  display: none;
}

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
