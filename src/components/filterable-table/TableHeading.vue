<template>
  <div 
    class="cell flex flex-h-center"
    :style="cssVariables"
  >
    <template v-if="heading">
      <span class="title">
        {{ heading.title }}
      </span>

      <table-tooltip v-if="hasTooltip" :text="heading.tooltip"></table-tooltip>

      <div class="sorting-toggle" @click="applySort()">
        <portal-target name="sort-icon">
          <svg-sort-icon class="sort-icon"/> <!-- Default sort icon -->
        </portal-target>
      </div>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import TableTooltip from './TableTooltip.vue'
import SvgSortIcon from './svgs/SvgSortIcon.vue'

const { mapGetters, mapActions } = createNamespacedHelpers('filterableTable')

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
    ...mapGetters({
      currentSort: 'getSelectedSort',
      options: 'options'
    }),

    cssVariables () {
      const { bgColor, borderColor, borderStyle, borderWidth, fontFamily, fontWeight } = this.options(this.tableId).headings

      return {
        '--bg-color': bgColor,
        '--border-color': borderColor,
        '--border-style': borderStyle,
        '--border-width': borderWidth,
        '--font-family': fontFamily,
        '--font-weight': fontWeight
      }
    },

    hasTooltip () {
      return 'tooltip' in this.heading
    },
  },

  methods: {
    ...mapActions([
      'updateSelectedSort'
    ]),

    applySort () {
      this.updateSelectedSort(this.buildSortingPayload())
      this.$root.$emit('getNewItems')
    },

    buildSortingPayload () {
      return {
        tableId: this.tableId,
        sortObj: {
          column: this.heading.field,
          ascending: this.isNewSortAscending()
        }
      }
    },

    isNewSortAscending () {
      if (this.isColumnCurrentlySorted()) {
        return !this.currentSort(this.tableId).ascending
      } else {
        return true
      }
    },

    isColumnCurrentlySorted () {
      return this.currentSort(this.tableId).column == this.heading.field
    }
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
