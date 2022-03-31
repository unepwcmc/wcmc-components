<template>
  <div 
    class="cell flex flex-h-center"
    :style="cssVariables"
  >
    <template v-if="heading">
      <span 
        class="title"
        v-text="heading.title"
      />

      <table-tooltip v-if="hasTooltip" :text="heading.tooltip"></table-tooltip>

      <div
        v-if="tableIsSortable"
        class="sorting-toggle"
        @click="sortColumn"
      >
        <portal-target name="sort-icon">
          <svg-sort-icon class="sort-icon" width="10.305" height="12.305" currentColor="#fff"/> <!-- Default sort icon -->
        </portal-target>
      </div>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import TableTooltip from './TableTooltip.vue'
import SvgSortIcon from './svgs/SvgSortIcon.vue'

const { mapState, mapActions } = createNamespacedHelpers('filterableTable')

export default {
  name: 'TableHeading',

  components: {
    TableTooltip,
    SvgSortIcon
  },

  props: {
    heading: {
      type: Object
    },

    tableId: {
      required: true,
      type: Number
    }
  },

  computed: {
    ...mapState({
      tables (state) { 
        return state.tables
      },
    }),

    table () { return this.tables[this.tableId] },

    options () { return this.table.options },

    currentSort () { return this.table.selectedSort },

    headings () { return this.options.headings },

    tableIsSortable () { return this.options.sortable },

    cssVariables () {
      const { bgColor, borderColor, borderStyle, borderWidth, fontFamily, fontWeight } = this.headings

      return {
        '--bg-color': bgColor,
        '--border-color': borderColor,
        '--border-style': borderStyle,
        '--border-width': borderWidth,
        '--font-family': fontFamily,
        '--font-weight': fontWeight
      }
    },

    hasTooltip () { return 'tooltip' in this.heading },

    columnUnsorted () { return this.currentSort.column !== this.heading.field },

    currentSortIsDescending () { return !this.currentSort.ascending },

    isNewSortAscending () { return this.columnUnsorted || this.currentSortIsDescending },

    sortingPayload () {
      return {
        tableId: this.tableId,
        sortObj: {
          column: this.heading.field,
          ascending: this.isNewSortAscending
        }
      }
    },
  },

  methods: {
    ...mapActions([
      'updateSelectedSort'
    ]),

    sortColumn () {
      this.updateSelectedSort(this.sortingPayload)
      this.$root.$emit('getNewItems')
    },
  }
}
</script>

<style lang='scss' scoped>
.cell {
  background-color: #000000; // IE11
  background-color: var(--bg-color);
  border-left: solid #ffffff 1px; // IE11
  border-left: var(--border-style) var(--border-color) var(--border-width);
  color: white;
  font-size: rem-calc(18);
  font-family: Arial, sans-serif; // IE11
  font-family: var(--font-family);
  font-weight: normal; // IE11
  font-weight: var(--font-weight);
  height: rem-calc(57);
  padding: rem-calc(8 14);
  width: 100%;

  display: inline-block;

  @include breakpoint($small) {
    width: auto;

    align-items: center;
    display: flex;
  }

  &:first-child {
    border-left: none;
  }
}

.sorting-toggle {
  margin-left: rem-calc(5);
  
  &:hover {
    cursor: pointer;
  }
}

</style>
