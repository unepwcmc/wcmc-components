<template>
  <tr
    id="sticky"
    class="ct-table-head__tr"
  >
    <TableHeader
      v-for="(heading, tableHeadingIndex) in headersInfomation.headersForTable"
      :key="`${tableHeadingIndex}tableHeading`"
      v-bind="{
        headerAttributes: heading,
        tableId
      }"
      @fetchNewData="(actionConfig) => emit('fetchNewData', actionConfig)"
    />
    <!-- empty header for 'more content' and admin buttons -->
    <TableHeader
      v-for="n in headersInfomation.headersLength - headersInfomation.headersForTable.length"
      :key="`${n}tableHeadingAdminMoreContent`"
      v-bind="{
        tableId
      }"
    />
  </tr>
</template>
<script setup lang="ts">
import TableHeader from '@/components/FilterableTable/Headers/Header.vue'
import { useFilterableTableStore } from '@/store/filterableTable'
import { storeToRefs } from 'pinia'

const props = defineProps({
  tableId: {
    required: true,
    type: String
  }
})
const emit = defineEmits(['fetchNewData'])

const FilterableTableStore = useFilterableTableStore(props.tableId)
const { headersInfomation } = storeToRefs(FilterableTableStore)
</script>

<style lang="postcss" scoped>
.ct-table-head {
  &__tr {
    @apply bg-primary;
  }
}
</style>

<!-- 
<script>
import { createNamespacedHelpers } from 'vuex'
import TableHeading from './TableHeading.vue'
import mixinColumns from './mixins/mixin-columns'

const { mapGetters } = createNamespacedHelpers('filterableTable')

export default {
  name: 'TableHead',

  components: { TableHeading },

  mixins: [mixinColumns],

  props: {
    headings: {
      required: true,
      type: Array
    },

    tableId: {
      required: true,
      type: Number
    },

    totalColumns: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      stickyTrigger: 0,
      isSticky: false
    }
  },

  computed: {
    ...mapGetters(['isMoreContentColumnDisplayed']),

    cssVariables() {
      return {
        'grid-template-columns': this.gridColumnsCss,
        'grid-columns': this.gridColumnsCss // IE11
      }
    },

    emptyHeaderCount() {
      return this.totalColumns - this.headings.length
    }
  },

  mounted() {
    this.setStickyTrigger()
    this.scrollHandler()
  },

  methods: {
    getEmptyHeaderIndex(n) {
      return this.totalColumns - this.emptyHeaderCount + n
    },

    setStickyTrigger() {
      const stickyElement = document.getElementById('sticky')
      const stickyElementHeight = stickyElement.clientHeight
      const stickyYOffset = stickyElement.getBoundingClientRect().top + window.pageYOffset

      this.stickyTrigger = stickyElementHeight + stickyYOffset
    },

    scrollHandler() {
      setInterval(() => {
        let scrollY = window.pageYOffset

        this.isSticky = scrollY > this.stickyTrigger ? true : false
      }, 100)
    },
    getNewItems() {
      this.$emit('getNewItems')
    }
  }
}
</script>-->

<!--
<style lang="scss" scoped>
$table-head-bg-color: #306088ff !default;
$table-head-color: #fff !default;

.table-head {
  background-color: $table-head-bg-color;
  color: $table-head-color;
  margin-top: rem-calc(30);
  // height: rem-calc(56);

  display: none;

  @include breakpoint($medium) {
    // IE11
    display: grid;
  }
}
</style> -->
