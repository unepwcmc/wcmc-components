<template>
  <div class="cell flex flex-h-center" :style="cssVariables">
    <template v-if="heading">
      <span class="title" v-text="heading.title" />

      <table-tooltip v-if="hasTooltip" :text="heading.tooltip" />

      <div v-if="columnIsSortable" class="sorting-toggle" @click="sortColumn">
        <portal-target name="sort-icon">
          <svg-sort-icon class="sort-icon--default" />
          <!-- Default sort icon -->
        </portal-target>
      </div>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import TableTooltip from './TableTooltip.vue'
import SvgSortIcon from './svgs/SvgSortIcon.vue'

const { mapGetters, mapState, mapActions } = createNamespacedHelpers('filterableTable')

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
    ...mapGetters(['getSelectedSort']),

    ...mapState({
      tables(state) {
        return state.tables
      }
    }),

    cssVariables() {
      const { bgColor, borderColor, borderStyle, borderWidth, fontFamily, fontWeight } =
        this.headings

      return {
        '--bg-color': bgColor,
        '--border-color': borderColor,
        '--border-style': borderStyle,
        '--border-width': borderWidth,
        '--font-family': fontFamily,
        '--font-weight': fontWeight
      }
    },

    hasTooltip() {
      return 'tooltip' in this.heading
    },

    headings() {
      return this.options.headings
    },

    options() {
      return this.table.options
    },

    table() {
      return this.tables[this.tableId]
    },

    tableIsSortable() {
      return this.options.sortable
    },

    columnIsSortable() {
      return this.heading.sortable === null ? this.tableIsSortable : this.heading.sortable
    }
  },

  methods: {
    ...mapActions(['updateSelectedSort']),

    isNewSortAscending() {
      return this.columnUnsorted || this.currentSortIsDescending
    },

    sortColumn() {
      const currentSort = this.getSelectedSort(this.tableId)
      const isNewSortAscending = currentSort.column !== this.heading.field || !currentSort.ascending
      const sortingPayload = {
        tableId: this.tableId,
        sortObj: {
          column: this.heading.field,
          ascending: isNewSortAscending
        }
      }

      this.updateSelectedSort(sortingPayload)
      this.$emit('getNewItems')
    }
  }
}
</script>

<style lang="scss" scoped>
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

.sort-icon--default {
  color: #fff;
  width: rem-calc(10.3);
  height: rem-calc(10.3);
}
</style>
