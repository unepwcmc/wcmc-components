<template>
  <th
    v-if="headerAttributes"
    class="ct-table-heading__tr"
  >
    <span
      class="ct-table-heading__container"
      v-if="headerAttributes.title"
    >
      <p
        :class="
          headerSortingTitleCustomClass ? headerSortingTitleCustomClass : 'ct-table-heading__title'
        "
        class="ct-table-heading__title"
        v-text="headerAttributes.title"
      />
      <template v-if="columnIsSortable">
        <SvgSortDefault
          v-if="headerAttributes.sortingOrder === 'default'"
          @click="sortColumnBy('ascending')"
          :class="
            headerSortingIconCustomClass
              ? headerSortingIconCustomClass
              : 'ct-table-heading__sort-icon'
          "
        />
        <SvgSortAscending
          v-else-if="headerAttributes.sortingOrder === 'ascending'"
          @click="sortColumnBy('descending')"
          :class="
            headerSortingIconCustomClass
              ? headerSortingIconCustomClass
              : 'ct-table-heading__sort-icon'
          "
        />
        <SvgSortDescending
          v-else-if="headerAttributes.sortingOrder === 'descending'"
          @click="sortColumnBy('default')"
          :class="
            headerSortingIconCustomClass
              ? headerSortingIconCustomClass
              : 'ct-table-heading__sort-icon'
          "
        />
      </template>
    </span>
  </th>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import SvgSortDefault from '@/components/Icons/SvgSortDefault.vue'
import SvgSortAscending from '@/components/Icons/SvgSortAscending.vue'
import SvgSortDescending from '@/components/Icons/SvgSortDescending.vue'
import { useFilterableTableStore } from '@/store/filterableTable'
import type { HeadingAttributes, HeadingSortBy } from '@/types/FilterableTable/configTypes'
import { storeToRefs } from 'pinia'

const props = defineProps({
  tableId: {
    required: true,
    type: String
  },
  headerAttributes: {
    required: false,
    type: Object as PropType<HeadingAttributes>,
    default: () => {
      return {
        field: '',
        title: '',
        sortingOrder: null
      }
    }
  }
})
const emit = defineEmits(['fetchNewData'])
const FilterableTableStore = useFilterableTableStore(props.tableId)
const { updateTableSorting, getNewItems, findCustomClassName } = FilterableTableStore
const { classes } = storeToRefs(FilterableTableStore)
console.log(classes.value)

const headerSortingIconCustomClass = computed(() =>
  findCustomClassName('ct-table-heading__sort-icon')
)
const headerSortingTitleCustomClass = computed(() => findCustomClassName('ct-table-heading__title'))

const columnIsSortable = computed(
  () =>
    props.headerAttributes.sortingOrder
      ? ['ascending', 'descending', 'default'].indexOf(props.headerAttributes.sortingOrder) > -1
      : false //When it is not sortable (The value is null)
)

function sortColumnBy(sortingOrder: HeadingSortBy) {
  const field = props.headerAttributes.field
  if (field) {
    const newCofig = updateTableSorting(field, sortingOrder)
    getNewItems()
    emit('fetchNewData', { from: 'sortColumnBy' })
  } else {
    console.warn(
      'An empty field found while sorting column the attribute infomation is',
      props.headerAttributes
    )
  }
}
</script>

<style lang="postcss" scoped>
.ct-table-heading {
  &__th {
    @apply text-center;
  }

  &__container {
    @apply flex
    grow-0
    text-center
    items-center
    gap-1
    md:gap-2;
  }

  &__title {
    @apply text-white;
  }

  &__sort-icon {
    @apply text-white
    w-[2vw]
    md:w-[3vw];
  }
}
</style>

<!-- <script lang="js">
import { createNamespacedHelpers } from 'vuex'
import { useFilterableTableStore } from '@/store/filterableTable'

// import SvgSortIcon from './svgs/SvgSortIcon.vue'

const { mapGetters, mapState, mapActions } = createNamespacedHelpers('filterableTable')

export default {
  // name: 'TableHeading',

  // components: {
  //   SvgSortIcon
  // },

  // props: {
  //   headerAttributes: {
  //     type: Object
  //   },

  //   tableId: {
  //     required: true,
  //     type: Number
  //   }
  // },

  computed: {
    ...mapGetters(['getSelectedSort']),

    ...mapState({
      tables(state) {
        return state.tables
      }
    })

    // cssVariables() {
    //   const { bgColor, borderColor, borderStyle, borderWidth, fontFamily, fontWeight } =
    //     this.headings

    //   return {
    //     '--bg-color': bgColor,
    //     '--border-color': borderColor,
    //     '--border-style': borderStyle,
    //     '--border-width': borderWidth,
    //     '--font-family': fontFamily,
    //     '--font-weight': fontWeight
    //   }
    // },

    // hasTooltip() {
    //   return 'tooltip' in this.headerAttributes
    // },

    // headings() {
    //   return this.options.headings
    // },

    // options() {
    //   return this.table.options
    // },

    // table() {
    //   return this.tables[this.tableId]
    // },

    // tableIsSortable() {
    //   return this.options.sortable
    // },

    // columnIsSortable() {
    //   return this.headerAttributes.sortable === null
    //     ? this.tableIsSortable
    //     : this.headerAttributes.sortable
    // }
  },

  methods: {
    ...mapActions(['updateSelectedSort']),

    isNewSortAscending() {
      return this.columnUnsorted || this.currentSortIsDescending
    },

    sortColumn() {
      const currentSort = this.getSelectedSort(this.tableId)
      const isNewSortAscending =
        currentSort.column !== this.headerAttributes.field || !currentSort.ascending
      const sortingPayload = {
        tableId: this.tableId,
        sortObj: {
          column: this.headerAttributes.field,
          ascending: isNewSortAscending
        }
      }

      this.updateSelectedSort(sortingPayload)
      this.$emit('getNewItems')
    }
  }
}
</script> -->

<!-- <style lang="scss" scoped>
.cell {
  background-color: #000; // IE11
  background-color: var(--bg-color);
  border-left: solid #fff 1px; // IE11
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
</style> -->
