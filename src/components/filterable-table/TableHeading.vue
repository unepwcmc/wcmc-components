<template>
  <div 
    class="cell flex flex-h-center"
    :style="cssVariables" 
  >
    <template v-if="heading">
      <span class="title">{{ heading.title }}</span>

      <table-tooltip v-if="hasTooltip" :text="heading.tooltip"></table-tooltip>

      <div class="sorting">
        <div @click="applySort(ascending = true)">
          <slot name="ascending-sort" />
        </div>

        <div @click="applySort(ascending = false)">
          <slot name="descending-sort" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TableTooltip from './TableTooltip.vue'

export default {
  name: 'TableHeading',

  components: { TableTooltip },

  props: {
    heading: {
      type: Object
    },

    tableId: {
      required: true,
      type: Number,
    }
  },

  computed: {
    cssVariables () {
      return {
        '--bg-color': this.options.headings.bgColor,
        '--border-color': this.options.headings.borderColor,
        '--border-style': this.options.headings.borderStyle,
        '--border-width': this.options.headings.borderWidth,
        '--font-family': this.options.headings.fontFamily,
        '--font-weight': this.options.headings.fontWeight
      }
    },
    // only show the sort buttons if the title has a heading
    hasOptions () {
      return this.heading.options != undefined || this.heading.name != undefined
    },

    hasTooltip () {
      return 'tooltip' in this.heading
    },

    options () {
      return this.$store.getters['filterableTable/options'](this.tableId)
    }
  },

  methods: {
    applySort (ascending) {
      const payload = this.buildPayload(ascending)

      this.$store.dispatch('filterableTable/updateSelectedSort', payload)
      this.$root.$emit('getNewItems')
    },

    buildPayload (ascending) {
      return {
        tableId: this.tableId,
        sortObj: {
          column: this.heading.field,
          ascending
        }
      }
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

  &:first-child { border-left: none; }
}

.sort {
  &--ascending {

  }

  &--descending {
    
  }
}
</style>