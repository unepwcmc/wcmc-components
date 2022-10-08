<template>
  <div
    class="row"
    :style="cssVariablesAndStyles"
  >
    <table-cell
      v-for="cell, cellIndex in columns"
      :key="Math.random() * cellIndex"
      :style="`grid-column: ${cellIndex + 1}`"
      :cell="cell"
    />

    <table-cell
      v-if="this.isMoreContentColumnDisplayed(this.tableId)" 
      :style="`grid-column: ${totalColumns}`"
    >
      <a
        v-if="item.pageUrl"
        class="button"
        :href="item.pageUrl"
      >
        <portal-target name="row-link-icon">
          <svg-arrow class="button__svg" />
        </portal-target>
      </a>

      <button
        v-else
        class="button"
        @click="openModal"
      >
        <portal-target name="row-link-icon">
          <svg-arrow class="button__svg" />
        </portal-target>
      </button>
    </table-cell>
  </div>
</template>

<script>
import SvgArrow from './svgs/SvgArrow.vue'
import TableCell from './TableCell.vue'
import mixinColumns from './mixins/mixin-columns'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('filterableTable')

export default {
  name: "row",

  components: { TableCell, SvgArrow },

  mixins: [mixinColumns],

  props: {
    item: {
      required: true,
      type: Object,
    },

    itemIndex: {
      required: true,
      type: Number,
    },

    tableId: {
      required: true,
      type: Number,
    },

    totalColumns: {
      required: true,
      type: Number,
    }
  },

  computed: {
    ...mapGetters([
      'options',
      'isMoreContentColumnDisplayed'
    ]),

    cssVariablesAndStyles () {
      return {
        'grid-template-columns': this.gridColumnsCss,
        'grid-columns': this.gridColumnsCss, // IE11
        '--bg-color-1': this.config.rows.bgColor1,
        '--bg-color-2': this.config.rows.bgColor2,
        '--bg-color-mobile': this.config.rows.bgColorMobile,
        '--border-color': this.config.rows.borderColor,
        '--border-style': this.config.rows.borderStyle,
        '--border-width': this.config.rows.borderWidth,
        '--button-hover-color': this.config.rows.buttonHoverColor,
        '--button-hover-color-arrow': this.config.rows.buttonHoverColorArrow
      }
    },

    projectTitle () {
      return this.trim(this.item.title)
    },

    config () {
      return this.options(this.tableId)
    },

    columns () {
      return this.item.cells.filter(cell => cell.showInTable === true)
    }
  },

  methods: {
    assessmentUrl (url) {
      const linkMarkdown = `<a href="${url}" title="View assessment" target="_blank">Link</a>`

      return url.includes('http') ? linkMarkdown : url
    },

    openModal () {
      const obj = {
        tableId: this.tableId,
        content: this.item.cells
      }

      this.$store.dispatch('filterableTable/updateModal', obj)

      const payload = {
        row: this.item,
        rowIndex: this.itemIndex,
        tableId: this.tableId,
        totalColumns: this.totalColumns
      }

      this.$root.$emit('openModal', payload)
    },

    trim (phrase) {
      const length = phrase.length
      let output

      if (length <= 30) {
        output = phrase
      } else {
        output = phrase.substring(0, 27) + '...'
      }

      return output
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  background-color: #efefef; // IE11
  background-color: var(--bg-color-mobile);
  font-family: Arial, sans-serif; // IE11
  font-family: var(--font-family);
  margin-bottom: rem-calc(18);
  padding: rem-calc(6 0);

  display: flex;
  flex-direction: column;

  @include breakpoint($medium) {
    background-color: #ffffff; // IE11
    background-color: var(--bg-color-1);
    margin: 0;
    padding: 0;

    display: -ms-grid; // IE11
    display: grid;
  }

  &:nth-child(even) {
    @include breakpoint($medium) {
      background-color: #f4f4f4; // IE11
      background-color: var(--bg-color-2);
    }
  }
}

.button {
  background: transparent;
  border: none;
  padding: 0;

  display: block;

  &:hover {
    cursor: pointer;

    ::v-deep .svg-arrow .svg__circle {
      fill: #009fe3; // IE11
      fill: var(--button-hover-color);
    }

    ::v-deep .svg-arrow .svg__arrow {
      fill: #fff; // IE11
      fill: var(--button-hover-color-arrow);
    }
  }
}
</style>