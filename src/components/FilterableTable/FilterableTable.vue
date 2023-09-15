<template>
  <div>
    <!-- <portal to="sort-icon">
      <slot name="sort-icon" />
    </portal>

    <portal to="row-link-icon">
      <slot name="row-link-icon" />
    </portal> -->
    <!--
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
    /> -->
    <table class="ct-filterable-table">
      <TableHeaders
        v-bind="{ tableId }"
        @fetchNewData="fetchNewData"
      />

      <template v-if="modelValue.length > 0">
        <TableRow
          v-for="(row, rowIndex) in modelValue"
          :key="`row${rowIndex}`"
          v-bind="{
            row,
            tableId
            // itemIndex: rowIndex,
          }"
          @editAction="editAction"
          @routeInternalLink="routeInternalLink"
        />
        <!-- @openModal="openModal" -->
      </template>
      <tr v-else>
        <td
          :colspan="headersInfomation.headersLength"
          class="ct-filterable-table__no-result-message"
          v-text="getAText('noResult')"
        />
      </tr>
      <!-- <div class="table-body">
    
    </div> -->

      <!-- <table-pagination
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
    /> -->
    </table>
  </div>
</template>
<script setup lang="ts">
import TableHeaders from '@/components/FilterableTable/Headers/Headers.vue'
import TableRow from '@/components/FilterableTable/TableRow.vue'
import { defaultOptions, useFilterableTableStore } from '@/store/filterableTable'
import { storeToRefs } from 'pinia'
import type { InternalLinkInfo } from '@/types/FilterableTable/emitTypes.ts'

const props = defineProps({
  modelValue: { type: Array, required: true },
  id: {
    type: String,
    required: true,
    default: () => {
      const tableID = `FilterableTable${Math.random() * 100}`
      console.warn(
        `Please provide unique id for the table. We have assigned a ramdom id to the component. However, if the table ID ${tableID} is coincidentally same as another filterable table it will cause error for pinia!`
      )
      return tableID
    }
  },
  attributes: {
    type: Array,
    default: []
  },
  options: {
    type: Object,
    default: () => defaultOptions()
  },
  classes: {
    type: Object,
    default: () => {}
  }
  // filterArray: {
  //   type: Array
  // },

  // itemsPerPage: {
  //   default: 10,
  //   type: Number
  // },

  // legendArray: {
  //   type: Array
  // },
})

const tableId = props.id
const emit = defineEmits(['editAction', 'fetchNewData', 'routeInternalLink'])
const FilterableTableStore = useFilterableTableStore(tableId)
const { config, headersInfomation } = storeToRefs(FilterableTableStore)
const { initTable, updateOptionsElement, getAText } = FilterableTableStore

initTable(props)
// const { attributes, options } = config.value

function editAction(currentRowData: any) {
  console.log('EditAction is called')

  // const { refreshData } = emit('editAction', currentRowData)
  // if (refreshData) getNewItems()
}
function routeInternalLink(routeInfo: InternalLinkInfo) {
  emit('routeInternalLink', routeInfo)
}
function fetchNewData(actionConfig: any) {
  console.log(actionConfig)
  emit('fetchNewData')
}
</script>

<style lang="postcss" scoped>
.ct-filterable-table {
  @apply table-auto;

  &__no-result-message {
    @apply text-center;
  }
}
</style>
<!-- <script>
import { computed, defineEmits } from 'vue'
import axios from 'axios'
import { merge } from 'lodash'
import { createNamespacedHelpers } from 'vuex'

import { DEFAULT_OPTIONS, DUMMY_DATA } from './constants.js'
import { setAxiosHeaders } from '../../helpers/helpers-axios.js'

import NewRecordButton from './NewRecordButton.vue'
import TableHeader from '@/components/filterable-table/header/Header.vue'
import TableFilters from './TableFilters.vue'
import TableModal from './TableModal.vue'
import TablePagination from './TablePagination.vue'
import TableRow from './TableRow.vue'
import ArchiveButton from './ArchiveButton.vue'
import { useFilterableTableStore } from '@/store/filterableTable'
import { storeToRefs } from 'pinia'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('filterableTable')

export default {
  name: 'FilterableTable',

  components: {
    NewRecordButton,
    TableHeader,
    TableFilters,
    TableModal,
    TablePagination,
    TableRow,
    ArchiveButton
  },

  props: {
    modelValue: { type: Array },
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
    },
    data: {
      type: Array
    }
  },
  setup(props) {
    const emit = defineEmits(['editAction', 'fetchNewData'])
    const FilterableTableStore = useFilterableTableStore(1)()
    const { rows, config } = storeToRefs(FilterableTableStore)

    const { initTable, updateOptionsElement } = FilterableTableStore

    initTable(props)
    const { attributes, options } = config.value

    const totalTableColumnLengh = computed(() => {
      const totalColumns =
        attributes.value.length +
        [
          options.value.showArchived,
          options.value.showEdit,
          options.value.showMoreContentColumn
        ].filter((extraColumn) => extraColumn === true).length
      return totalColumns
    })
    const attributesA = computed(() => attributes.value)

    function editAction(currentRowData) {
      const { refreshData } = emit('editAction', currentRowData)
      if (refreshData) getNewItems()
    }
    function fetchNewData(actionConfig) {
      console.log(actionConfig)
      emit('fetchNewData')
    }
    return {
      updateOptionsElement,
      totalTableColumnLengh,
      attributesA,
      rows,
      editAction,
      fetchNewData
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

    // hasItems() {
    //   return this.items.length > 0
    // },

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
      // this.getNewItems()
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

    // getNewItems() {
    //   const data = {
    //     filters: this.selectedFilterOptions(this.id),
    //     items_per_page: this.itemsPerPage,
    //     requested_page: this.requestedPage(this.id)
    //   }

    //   if (this.isSortable(this.id)) {
    //     data.sort = this.selectedSort(this.id)
    //   }

    //   setAxiosHeaders(axios)

    //   axios
    //     .post(this.endpoint, data)
    //     .then((response) => {
    //       console.log(response.data)
    //       this.updateProperties(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },

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
      console.log([
        this.isMoreContentColumnDisplayed(this.id),
        this.config(this.id).showArchived,
        this.config(this.id).showEdit
      ])
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
      console.log('Updated')
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
</script> -->
